const Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");

NetworkEvents.dataReceived("key.jump", (e) => {
  const { player, level } = e;

  if (player.onGround()) {
    player.persistentData.putBoolean("double_jump_used", false);
    e.cancel();
  }
  if (player.isInWater()) e.cancel();

  let used = player.persistentData.getBoolean("double_jump_used");
  let current = player.deltaMovement;
  let newMotion;

  if (!used) {
    switch (true) {
      case player.motionY <= 0:
        player.persistentData.putBoolean("double_jump_used", true);

        newMotion = new Vec3(
          current.x + player.motionX,
          0.42,
          current.z + player.motionZ,
        );

        player.setDeltaMovement(newMotion);

        player.hurtMarked = true;

        level.spawnParticles(
          "cloud",
          true,
          player.x,
          player.y,
          player.z,
          0.1,
          0.1,
          0.1,
          10,
          0.05,
        );
        break;

      case player.shiftKeyDown:
        player.persistentData.putBoolean("double_jump_used", true);
        newMotion = new Vec3(
          current.x + player.motionX,
          0.5,
          current.z + player.motionZ,
        );

        player.setDeltaMovement(newMotion);

        player.hurtMarked = true;

        level.spawnParticles(
          "cloud",
          true,
          player.x,
          player.y,
          player.z,
          0.1,
          0.1,
          0.1,
          10,
          0.05,
        );
        break;

      default:
        break;
    }
  }
  e.cancel();
});

NetworkEvents.dataReceived("key.dash", (e) => {
  const { player, level } = e;
  const player_data = player.persistentData;

  if (player_data.getBoolean("dash_used")) e.cancel();

  let direction = player.getLookAngle();
  let force = 1;

  level.spawnParticles(
    "cloud",
    true,
    player.x,
    player.y,
    player.z,
    0.1,
    0.1,
    0.1,
    10,
    0.05,
  );
  player.hurtMarked = true;
  player.addMotion(direction.x * force, 0, direction.z * force);
  player.potionEffects.add("minecraft:speed", 20 * 3, 1);
  player_data.putBoolean("dash_used", true);
  player_data.putFloat("dash_cooldown", 20 * 3);
});

PlayerEvents.tick((e) => {
  const { player } = e;

  if (player.persistentData.getFloat("dash_cooldown") > 0) {
    let cooldown = player.persistentData.getFloat("dash_cooldown");
    cooldown--;
    player.persistentData.putFloat("dash_cooldown", cooldown);
  } else {
    player.persistentData.putBoolean("dash_used", false)
  }
});
