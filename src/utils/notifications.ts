export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

export const sendNotification = (title: string, body: string, icon?: string): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/pwa-192x192.svg',
      badge: '/pwa-192x192.svg'
    });
  }
};

export const notifyCaptureSuccess = (pokemonName: string, isShiny: boolean): void => {
  const title = isShiny ? '✨ Shiny Capture!' : "It's a catch!";
  const body = isShiny 
    ? `Shine bright like a diamond! You caught a shiny ${pokemonName}!`
    : `${pokemonName} was successfully captured!`;
  sendNotification(title, body);
};

export const notifyShinyEncounter = (pokemonName: string): void => {
  sendNotification(
    '✨ A Shiny appeared!',
    `A wild shiny ${pokemonName} appeared! Don't let it escape!`
  );
};
