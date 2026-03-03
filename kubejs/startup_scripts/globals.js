global.meleeWeaponTypes = [
  {
    type: "sword",
    baseDamage: 3,
    baseSpeed: -2.4,
    class: ["blade", "medium", "slash"],
  },
  {
    type: "axe",
    baseDamage: 6,
    baseSpeed: -2.6,
    class: ["axe", "medium", "cleave"],
  },
  {
    type: "mace",
    baseDamage: 6,
    baseSpeed: -2.8,
    class: ["blunt", "heavy", "crush"],
  },
  {
    type: "spear",
    baseDamage: 3,
    baseSpeed: -2.4,
    class: ["polearm", "madium", "pierce", "reach"],
  },
  {
    type: "dagger",
    baseDamage: 2,
    baseSpeed: -1.6,
    class: ["blade", "light", "pierce", "swift"],
  },
  {
    type: "scythe",
    baseDamage: 8,
    baseSpeed: -3.0,
    class: ["blade", "heavy", "sweep"],
  },
  {
    type: "greatsword",
    baseDamage: 9,
    baseSpeed: -3.3,
    class: ["blade", "heavy", "cleave"],
  },
  {
    type: "sickle",
    baseDamage: 2,
    baseSpeed: -2.2,
    class: ["blade", "light", "sweep"],
  },
  {
    type: "claw",
    baseDamage: 0,
    baseSpeed: -1.2,
    class: ["unarmed", "light", "slash"],
  },
  {
    type: "twinblade",
    baseDamage: 5,
    baseSpeed: -2.2,
    class: ["polearm", "heavy", "sweep"],
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
