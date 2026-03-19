global.meleeWeaponTypes = [
  {
    type: "anchor",
    baseDamage: 12,
    baseSpeed: -3.6,
    silverVersion: false,
  },
  {
    type: "boneclub",
    baseDamage: 8,
    baseSpeed: -3.2,
    silverVersion: false,
  },
  {
    type: "claymore",
    baseDamage: 9,
    baseSpeed: -3.0,
    silverVersion: true,
  },
  {
    type: "obsidian_claymore",
    baseDamage: 11,
    baseSpeed: -3.1,
    silverVersion: false,
  },
  {
    type: "great_hammer",
    baseDamage: 10,
    baseSpeed: -3.3,
    silverVersion: false,
  },
  {
    type: "sword",
    baseDamage: 6,
    baseSpeed: -2.4,
    silverVersion: true,
  },
  {
    type: "axe",
    baseDamage: 7,
    baseSpeed: -2.9,
    silverVersion: false,
  },
  {
    type: "double_axe",
    baseDamage: 8,
    baseSpeed: -3.0,
    silverVersion: false,
  },
  {
    type: "mace",
    baseDamage: 7,
    baseSpeed: -2.6,
    silverVersion: false,
  },
  {
    type: "cutlass",
    baseDamage: 5,
    baseSpeed: -2.2,
    silverVersion: true,
  },
  {
    type: "katana",
    baseDamage: 7,
    baseSpeed: -2.4,
    silverVersion: true,
  },
  {
    type: "battlestaff",
    baseDamage: 4,
    baseSpeed: -2.0,
    silverVersion: false,
  },
  {
    type: "daggers",
    baseDamage: 3,
    baseSpeed: -1.2,
    silverVersion: true,
  },
  {
    type: "sickles",
    baseDamage: 3,
    baseSpeed: -1.5,
    silverVersion: true,
  },
  {
    type: "coral_blade",
    baseDamage: 4,
    baseSpeed: -1.0,
    silverVersion: false,
  },
  {
    type: "rapier",
    baseDamage: 2,
    baseSpeed: -0.8,
    silverVersion: true,
  },
  {
    type: "gauntlets",
    baseDamage: 2,
    baseSpeed: -0.5,
    silverVersion: false,
  },
  {
    type: "spear",
    baseDamage: 6,
    baseSpeed: -2.8,
    silverVersion: false,
  },
  {
    type: "glaive",
    baseDamage: 7,
    baseSpeed: -2.7,
    silverVersion: false,
  },
  {
    type: "soul_knife",
    baseDamage: 8,
    baseSpeed: -3.0,
    silverVersion: true,
  },
  {
    type: "scythe",
    baseDamage: 7,
    baseSpeed: -2.8,
    silverVersion: true,
  },
  {
    type: "tempest_knife",
    baseDamage: 4,
    baseSpeed: -1.8,
    silverVersion: true,
  },
  {
    type: "void_touched_blades",
    baseDamage: 4,
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

global.listToString = (arr) => {
  return arr
    .map((str) => {
      return global.capitalizeFirstLetter(str);
    })
    .join(", ");
};
