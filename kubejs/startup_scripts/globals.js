const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");
const BuiltInRegistries = Java.loadClass(
  "net.minecraft.core.registries.BuiltInRegistries",
);

global.meleeWeaponTypes = [
  {
    type: "sword",
    baseDamage: 3,
    baseSpeed: -2.4,
  },
  {
    type: "axe",
    baseDamage: 6,
    baseSpeed: -2.6,
  },
  {
    type: "mace",
    baseDamage: 6,
    baseSpeed: -2.8,
  },
  {
    type: "spear",
    baseDamage: 3,
    baseSpeed: -2.4,
  },
  {
    type: "dagger",
    baseDamage: 2,
    baseSpeed: -1.6,
  },
  {
    type: "scythe",
    baseDamage: 8,
    baseSpeed: -3.0,
  },
  {
    type: "greatsword",
    baseDamage: 9,
    baseSpeed: -3.3,
  },
  {
    type: "sickle",
    baseDamage: 2,
    baseSpeed: -2.2,
  },
  {
    type: "claw",
    baseDamage: 0,
    baseSpeed: -1.2,
  },
  {
    type: "twinblade",
    baseDamage: 5,
    baseSpeed: -2.2,
  },
];

global.rangeWeaponsTypes = [
  { type: "bow" },
  { type: "longbow" },
  { type: "shortbow" },
  { type: "recurve_bow" },
  { type: "crossbow" },
];

global.firearmWeaponsTypes = [
  { type: "pistol" },
  { type: "musket" },
  { type: "blunderbuss" },
];

global.handleMaterials = [
  { material: "oak", color: "#BF934B" }, // 0
  { material: "spruce", color: "#694F2F" }, // 1
  { material: "birch", color: "#F5DD8C" }, // 2
  { material: "jungle", color: "#B07B58" }, // 3
  { material: "acacia", color: "#AC5D33" }, // 4
  { material: "dark_oak", color: "#3C2712" }, // 5
  { material: "mangrove", color: "#6E192A" }, // 6
  { material: "cherry", color: "#F5C8C2" }, // 7
  { material: "bamboo", color: "#5E8A24" }, // 8
  { material: "crimson", color: "#863E5A" }, // 9
  { material: "warped", color: "#398382" }, // 10
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
    BuiltInRegistries.SOUND_EVENT.get(sound),
    SoundSource.PLAYERS,
    1.0,
    1.0,
  );
};
