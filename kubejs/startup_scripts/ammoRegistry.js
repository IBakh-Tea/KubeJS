StartupEvents.registry("entity_type", (e) => {
  e.create("bullet", "minecraft:arrow")
    .setKnockback(0)
    .setBaseDamage(0)
    .clientTrackingRange(8)
    .updateInterval(3)
    .defaultHitGroundSoundEvent("minecraft:entity.arrow.hit")
    .setWaterInertia(1)
    .sized(0.5, 0.5)
    .mobCategory("misc")
    .item((item) => {
      item
        .tag("minecraft:arrows")
        .maxStackSize(64)
        .texture("layer0", "kubejs:item/ammo/bullet")
        .translationKey("str");
    })
    .onHitBlock((ctx) => {
      const { entity, result } = ctx;

      if (result.getType() == "BLOCK") entity.kill();
    })
    .tick((ammo) => {
      ammo.noGravity = true;
      ammo.level.addParticle(
        "minecraft:mycelium",
        ammo.getX(),
        ammo.getY(),
        ammo.getZ(),
        0,
        0,
        0,
      );

      if (ammo.getOwner() == null) ammo.kill();
      else if (ammo.distanceToEntity(ammo.getOwner()) > 100) ammo.kill();
    })
    .textureLocation(() => {
      return "kubejs:textures/entity/ammo/invisible_bullet.png";
    });

  e.create("invisible_bullet", "minecraft:arrow")
    .setKnockback(0)
    .setBaseDamage(0)
    .clientTrackingRange(8)
    .updateInterval(3)
    .defaultHitGroundSoundEvent("minecraft:entity.arrow.hit")
    .setWaterInertia(1)
    .sized(0.5, 0.5)
    .mobCategory("misc")
    .item((item) => {
      item
        .tag("minecraft:arrows")
        .maxStackSize(999)
        .texture("layer0", "kubejs:item/ammo/_bullet")
        .translationKey("str")
        .tooltip("For the mob");
    })
    .onHitBlock((ctx) => {
      const { entity, result } = ctx;

      if (result.getType() == "BLOCK") entity.kill();
    })
    .tick((ammo) => {
      ammo.level.addParticle(
        "minecraft:mycelium",
        ammo.getX(),
        ammo.getY(),
        ammo.getZ(),
        0,
        0,
        0,
      );

      if (ammo.getOwner() == null) ammo.kill();
      else if (ammo.distanceToEntity(ammo.getOwner()) > 100) ammo.kill();
    })
    .textureLocation(() => {
      return `kubejs:textures/entity/ammo/invisible_bullet.png`;
    });
});
