const $RegisterKeyMappingsEvent = Java.loadClass(
  "net.neoforged.neoforge.client.event.RegisterKeyMappingsEvent",
);
const $keyMapping = Java.loadClass("net.minecraft.client.KeyMapping");

NativeEvents.onEvent($RegisterKeyMappingsEvent, (event) => {
  event.register(new $keyMapping("key.dash", 82, "key.group"));
});
