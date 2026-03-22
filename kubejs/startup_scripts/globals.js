const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");
const BuiltInRegistries = Java.loadClass(
  "net.minecraft.core.registries.BuiltInRegistries",
);
const ResourceLocation = Java.loadClass(
  "net.minecraft.resources.ResourceLocation",
);
const ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext");
const BlockShapeContext = Java.loadClass(
  "net.minecraft.world.phys.shapes.CollisionContext",
);

global.meleeWeaponTypes = [
  {
    type: "anchor",
    baseDamage: 10,
    baseSpeed: -3.6,
    silverVersion: false,
  },
  {
    type: "boneclub",
    baseDamage: 6,
    baseSpeed: -3.2,
    silverVersion: false,
  },
  {
    type: "claymore",
    baseDamage: 7,
    baseSpeed: -3.0,
    silverVersion: true,
  },
  {
    type: "obsidian_claymore",
    baseDamage: 9,
    baseSpeed: -3.1,
    silverVersion: false,
  },
  {
    type: "great_hammer",
    baseDamage: 8,
    baseSpeed: -3.3,
    silverVersion: false,
  },
  {
    type: "sword",
    baseDamage: 4,
    baseSpeed: -2.4,
    silverVersion: true,
  },
  {
    type: "axe",
    baseDamage: 5,
    baseSpeed: -2.9,
    silverVersion: false,
  },
  {
    type: "double_axe",
    baseDamage: 6,
    baseSpeed: -3.0,
    silverVersion: false,
  },
  {
    type: "mace",
    baseDamage: 5,
    baseSpeed: -2.6,
    silverVersion: false,
  },
  {
    type: "cutlass",
    baseDamage: 3,
    baseSpeed: -2.2,
    silverVersion: true,
  },
  {
    type: "katana",
    baseDamage: 5,
    baseSpeed: -2.4,
    silverVersion: true,
  },
  {
    type: "battlestaff",
    baseDamage: 2,
    baseSpeed: -2.0,
    silverVersion: false,
  },
  {
    type: "daggers",
    baseDamage: 1,
    baseSpeed: -1.2,
    silverVersion: true,
  },
  {
    type: "sickles",
    baseDamage: 1,
    baseSpeed: -1.5,
    silverVersion: true,
  },
  {
    type: "coral_blade",
    baseDamage: 2,
    baseSpeed: -1.0,
    silverVersion: false,
  },
  {
    type: "rapier",
    baseDamage: 0,
    baseSpeed: -0.8,
    silverVersion: true,
  },
  {
    type: "gauntlets",
    baseDamage: 0,
    baseSpeed: -0.5,
    silverVersion: false,
  },
  {
    type: "spear",
    baseDamage: 4,
    baseSpeed: -2.8,
    silverVersion: false,
  },
  {
    type: "glaive",
    baseDamage: 5,
    baseSpeed: -2.7,
    silverVersion: false,
  },
  {
    type: "soul_knife",
    baseDamage: 6,
    baseSpeed: -3.0,
    silverVersion: true,
  },
  {
    type: "scythe",
    baseDamage: 5,
    baseSpeed: -2.8,
    silverVersion: true,
  },
  {
    type: "tempest_knife",
    baseDamage: 2,
    baseSpeed: -1.8,
    silverVersion: true,
  },
  {
    type: "void_touched_blades",
    baseDamage: 2,
    baseSpeed: -1.4,
    silverVersion: false,
  },
];

global.rangeWeaponsTypes = [
  { type: "bow" },
  { type: "longbow" },
  { type: "crossbow" },
];

global.handleMaterials = [
  { material: "oak", color: "#BF934B" },
  { material: "spruce", color: "#694F2F" },
  { material: "birch", color: "#F5DD8C" },
  { material: "jungle", color: "#B07B58" },
  { material: "acacia", color: "#AC5D33" },
  { material: "dark_oak", color: "#3C2712" },
  { material: "mangrove", color: "#6E192A" },
  { material: "cherry", color: "#F5C8C2" },
  { material: "bamboo", color: "#5E8A24" },
  { material: "crimson", color: "#863E5A" },
  { material: "warped", color: "#398382" },
];

global.baseMaterials = [
  { material: "bone", color: "#EDEBCA" },
  { material: "flint", color: "#EDEBCA" },
  { material: "copper", color: "#DF7646" },
  { material: "iron", color: "#FFFFFF" },
  { material: "steel", color: "#FFFFFF" },
  { material: "netherite", color: "#FFFFFF" },
];

global.newTier = [
  {
    name: "bone",
    uses: 120,
    speed: 4.5,
    attackDamage: 0,
    enchantment: 13,
    repairMaterial: "minecraft:bone",
  },
  {
    name: "flint",
    uses: 100,
    speed: 4,
    attackDamage: 0.5,
    enchantment: 5,
    repairMaterial: "minecraft:flint",
  },
  {
    name: "copper",
    uses: 180,
    speed: 5,
    attackDamage: 1,
    enchantment: 13,
    repairMaterial: "minecraft:copper_ingot",
  },
  {
    name: "steel",
    uses: 400,
    speed: 6.5,
    attackDamage: 3,
    enchantment: 13,
    repairMaterial: "#c:ingots/steel",
  },
];

global.stringMaterials = { type: "string", color: "#CCCCCC" };

global.capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

global.playSound = (level, player, sound) => {
  level.playSound(
    null,
    player.x,
    player.y,
    player.z,
    BuiltInRegistries.SOUND_EVENT.get(ResourceLocation.parse(sound)),
    SoundSource.PLAYERS,
    1.0,
    1.0,
  );
};

global.getResourceLocation = (resource) => {
  return ResourceLocation.parse(resource);
};

global.shootBullet = (player, distance, damage, bulletCount, spread) => {
  let level = player.level;
  let startPos = player.eyePosition;

  for (let i = 0; i < bulletCount; i++) {
    let offX = (Math.random() - 0.5) * spread;
    let offY = (Math.random() - 0.5) * spread;
    let offZ = (Math.random() - 0.5) * spread;

    let lookVec = player.lookAngle.add(offX, offY, offZ).scale(distance);
    let endPos = startPos.add(lookVec);

    let blockHit = level.clip(
      new ClipContext(
        startPos,
        endPos,
        ClipContext.Block.COLLIDER,
        ClipContext.Fluid.NONE,
        player,
      ),
    );

    let finalEndPos = blockHit.location;

    let distToHit = startPos.distanceTo(finalEndPos);
    let steps = Math.floor(distToHit * 1.5); // чуть меньше плотность для оптимизации дроби
    for (let j = 0; j < steps; j++) {
      let t = j / steps;
      let px = startPos.x + (finalEndPos.x - startPos.x) * t;
      let py = startPos.y + (finalEndPos.y - startPos.y) * t;
      let pz = startPos.z + (finalEndPos.z - startPos.z) * t;
      level.spawnParticles(
        "minecraft:smoke",
        true,
        px,
        py,
        pz,
        0,
        0,
        0,
        1,
        0.01,
      );
    }

    let box = player.boundingBox.expandTowards(lookVec).inflate(1.0);
    let entityHit = null;
    let minDistance = distToHit;

    level.getEntitiesWithin(box).forEach((entity) => {
      if (entity.uuid != player.uuid && entity.living) {
        let hit = entity.boundingBox.inflate(0.2).clip(startPos, finalEndPos);
        if (hit.isPresent()) {
          let d = startPos.distanceTo(hit.get());
          if (d < minDistance) {
            minDistance = d;
            entityHit = entity;
          }
        }
      }
    });

    if (entityHit) {
      entityHit.attack(damage);
      global.playSound(level, player, "minecraft:entity.experience_orb.pickup");
    } else {
    }
    player.camera.setRotation(
      player.yaw + Math.floor(Math.random() * 3) - 1,
      player.pitch - Math.floor(Math.random() * 5),
    );
  }
};
