StartupEvents.registry("item", (e) => {
  [
    ["bounce", "<bounce a=4 f=1.8 w=0.2>BOING!"],
    ["fade", "<fade a=0.2 f=1.5 w=0.1>Fading Text"],
    ["glitch", "<glitch f=3 j=0.02 b=0.01 s=0.1>ERROR"],
    ["grad", "<grad from=#7FFFD4 to=#1E90FF hue uni>Flowing Gradient Text"],
    ["neon", "<neon p=8 r=2 a=0.15>Neon Glow"],
    ["pend", "<pend f=1.0 a=30 r=2>Swinging Around"],
    ["pulse", "<pulse base=0.6 a=0.4 f=1.5>Power Rising"],
    ["rainb", "<rainb f=1 w=0.5>Colorful Text!"],
    [
      "shadow",
      "<shadow a=0>No Shadow</shadow> <shadow r=1 a=0.6>Shadowed Text",
    ],
    ["shake", "<shake a=2 f=3>WARNING!"],
    ["swing", "<swing a=0.5 f=1.8>Waving Text"],
    ["turb", "<turb a=2 f=1.5>Windy Text"],
    ["wave", "<wave a=1 f=1.0 w=0.5>Flowing Text"],
    ["wiggle", "<wiggle a=1 f=2>Wiggly Text!"],
  ].forEach((effect) => {
    e.create(`${effect[0]}_stick`)
      .displayName(effect[1])
      .texture("minecraft:item/stick");
  });
});
