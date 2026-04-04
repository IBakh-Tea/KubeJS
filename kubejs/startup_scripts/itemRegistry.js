StartupEvents.registry("item", (e) => {
  [
    "pistol_round",
    "rifle_round",
    "shotgun_shell",
    "copper_roundshot",
    "iron_roundshot",
  ].forEach((bullet) => {
    e.create(bullet).texture("layer0", `kubejs:item/ammo/${bullet}`);
  });

  [
    { type: "standard_handgun_magazine", clip: 12 },
    { type: "large_handgun_magazine", clip: 24 },
    { type: "standard_assault_rifle_magazine", clip: 50 },
    { type: "drum_assault_rifle_magazine", clip: 100 },
  ].forEach((mag) => {
    e.create(mag.type)
      .texture("layer0", `kubejs:item/mags/${mag.type}`)
      .texture("layer1", `kubejs:item/mags/${mag.type}_loaded`)
      .color((item, index) => {
        let internalStorage = item.customData.internalStorage;

        switch (index) {
          case 0:
            return "#FFFFFF";
          case 1:
            if (internalStorage)
              if (internalStorage.length == mag.clip) return "#FFFFFF";
              else return;
        }
      })
      .barWidth((item) => {
        const internalStorage = item.customData.internalStorage;
        return internalStorage ? (internalStorage.length / mag.clip) * 13 : 0;
      })
      .barColor(() => Color.WHITE)
      .unstackable();
  });

  e.create("ramrod").texture("layer0", "kubejs:item/ramrod");

  [
    "handgun_silencer",
    "handgun_muzzle_brake",
    "assault_rifle_grip",
    "assault_rifle_handguard",
    "assault_rifle_stock",
    "assault_rifle_muzzle_brake",
    "assault_rifle_silencer",
  ].forEach((attachment) => {
    e.create(attachment).texture(
      "layer0",
      `kubejs:item/attachments/${attachment}`,
    );
  });
});
