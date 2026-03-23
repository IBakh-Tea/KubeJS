const keysToCheck = ["key.jump"];

ClientEvents.tick((event) => {
  const { player } = event;

  keysToCheck.forEach((keyName) => {
    const key = Client.options.keyMappings.find((k) => k.getName() === keyName);
    if (key) {
      let physicalKey = key.getKey().getName();
      if (key.consumeClick()) {
        player.sendData(keyName, {
          message: keyName,
          boundKey: physicalKey,
        });
      }
    }
  });
});
