const $keyMapping = Java.loadClass("net.minecraft.client.KeyMapping");

NativeEvents.onEvent(
  Java.loadClass(
    "net.neoforged.neoforge.client.event.RegisterKeyMappingsEvent",
  ),
  (event) => {
    event.register(new $keyMapping("key.dash", 82, "key.group"));
  },
);
