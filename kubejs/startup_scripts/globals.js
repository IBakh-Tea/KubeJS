const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");
const BuiltInRegistries = Java.loadClass(
  "net.minecraft.core.registries.BuiltInRegistries",
);
const ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext");

global.meleeWeaponTypes = [
  { type: "sword", baseDamage: 3, baseSpeed: -2.4 },
  { type: "axe", baseDamage: 6, baseSpeed: -2.6 },
  { type: "mace", baseDamage: 6, baseSpeed: -2.8 },
  { type: "spear", baseDamage: 3, baseSpeed: -2.4 },
  { type: "dagger", baseDamage: 2, baseSpeed: -1.6 },
  { type: "scythe", baseDamage: 8, baseSpeed: -3.0 },
  { type: "greatsword", baseDamage: 9, baseSpeed: -3.3 },
  { type: "sickle", baseDamage: 2, baseSpeed: -2.2 },
  { type: "claw", baseDamage: 0, baseSpeed: -1.2 },
  { type: "twinblade", baseDamage: 5, baseSpeed: -2.2 },
  { type: "battle_axe", baseDamage: 3, baseSpeed: -2.4 },
  { type: "battlestaff", baseDamage: 3, baseSpeed: -2.4 },
  { type: "boomerang", baseDamage: 3, baseSpeed: -2.4 },
  { type: "broadsword", baseDamage: 3, baseSpeed: -2.4 },
  { type: "buster_sword", baseDamage: 3, baseSpeed: -2.4 },
  { type: "claymore", baseDamage: 3, baseSpeed: -2.4 },
  { type: "cleaver", baseDamage: 3, baseSpeed: -2.4 },
  { type: "double_axe", baseDamage: 3, baseSpeed: -2.4 },
  { type: "glaive", baseDamage: 3, baseSpeed: -2.4 },
  { type: "halberd", baseDamage: 3, baseSpeed: -2.4 },
  { type: "hammer", baseDamage: 3, baseSpeed: -2.4 },
  { type: "katana", baseDamage: 3, baseSpeed: -2.4 },
  { type: "knuckle", baseDamage: 3, baseSpeed: -2.4 },
  { type: "lance", baseDamage: 3, baseSpeed: -2.4 },
  { type: "longsword", baseDamage: 3, baseSpeed: -2.4 },
  { type: "rapier", baseDamage: 3, baseSpeed: -2.4 },
  { type: "ring", baseDamage: 3, baseSpeed: -2.4 },
  { type: "shortsword", baseDamage: 3, baseSpeed: -2.4 },
  { type: "stiletto", baseDamage: 3, baseSpeed: -2.4 },
  { type: "throwing_knife", baseDamage: 3, baseSpeed: -2.4 },
  { type: "tomahawk", baseDamage: 3, baseSpeed: -2.4 },
  { type: "zweihander", baseDamage: 3, baseSpeed: -2.4 },
];

global.rangeWeaponsTypes = [
  { type: "bow" },
  { type: "longbow" },
  { type: "shortbow" },
  { type: "recurve_bow" },
  { type: "crossbow" },
];

global.flintlockWeaponsTypes = [
  { type: "pistol", damage: 1 },
  { type: "musket", damage: 1.5 },
  { type: "blunderbuss", damage: 1 },
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

global.baseMaterials = [{ material: "iron" }, { material: "netherite" }];

global.capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
