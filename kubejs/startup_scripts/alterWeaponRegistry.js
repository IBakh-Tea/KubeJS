// const DataComponent = Java.loadClass(
//   "net.rain.kubejs_datacomponent.KubeJSDataComponent$DataComponentAPI",
// );

// DataComponent.registerString("blade_material");

// DataComponent.registerString("handle_material");

// StartupEvents.registry("item", (e) => {
//   global.meleeWeaponTypes.forEach((weapon) => {
//     let item = e
//       .create(weapon.type, "sword")
//       .translationKey("str")
//       .tag("c:tool/melee_weapon")
//       .attackDamageBaseline(weapon.baseDamage)
//       .speedBaseline(weapon.baseSpeed);

//     weapon.class.forEach((cls) => {
//       item.tag(`c:tools/${cls}_weapon`);
//     });
//   });
// });
