const $RangedAttribute = Java.loadClass(
    "net.minecraft.world.entity.ai.attributes.RangedAttribute",
  ),
  ATTRIBUTE = Java.loadClass(
    "net.minecraft.core.registries.BuiltInRegistries",
  ).ATTRIBUTE,
  PLAYER = Java.loadClass("net.minecraft.world.entity.EntityType").PLAYER;

StartupEvents.registry("minecraft:attribute", (e) => {
  e.createCustom("humanity", () =>
    new $RangedAttribute(
      "attribute.name.kubejs.humanity",
      100.0,
      0.0,
      100.0,
    ).setSyncable(true),
  );
});

NativeEvents.onEvent(
  Java.loadClass(
    "net.neoforged.neoforge.event.entity.EntityAttributeModificationEvent",
  ),
  (e) => {
    const humanityHolder = ATTRIBUTE.getHolder("kubejs:humanity").get();

    e.add(PLAYER, humanityHolder);
  },
);
