import React, { useState, useEffect, useMemo } from 'react';

const COLORS = {
  white: { name: 'Bianco', hex: '#F5F2EC', warmth: 'warm', tone: 'light' },
  whitepure: { name: 'Bianco ottico', hex: '#FFFFFF', warmth: 'cool', tone: 'light' },
  cream: { name: 'Crema', hex: '#EDE8DF', warmth: 'warm', tone: 'light' },
  ivory: { name: 'Avorio', hex: '#F0E8D8', warmth: 'warm', tone: 'light' },
  ecru: { name: 'Écru', hex: '#E5DCC8', warmth: 'warm', tone: 'light' },
  beige: { name: 'Beige', hex: '#D4C4A8', warmth: 'warm', tone: 'light' },
  sand: { name: 'Sabbia', hex: '#C4A882', warmth: 'warm', tone: 'medium' },
  taupe: { name: 'Tortora', hex: '#9E9080', warmth: 'warm', tone: 'medium' },
  camel: { name: 'Cammello', hex: '#A88860', warmth: 'warm', tone: 'medium' },
  caramel: { name: 'Caramel', hex: '#C4924E', warmth: 'warm', tone: 'medium' },
  mustard: { name: 'Senape', hex: '#C49A2C', warmth: 'warm', tone: 'medium' },
  ochre: { name: 'Ocra', hex: '#B07A28', warmth: 'warm', tone: 'medium' },
  tobacco: { name: 'Tabacco', hex: '#7A6652', warmth: 'warm', tone: 'medium' },
  brown: { name: 'Marrone', hex: '#7A5C3A', warmth: 'warm', tone: 'medium' },
  chocolate: { name: 'Cioccolato', hex: '#4A3220', warmth: 'warm', tone: 'dark' },
  darkbrown: { name: 'Marrone scuro', hex: '#3D3528', warmth: 'warm', tone: 'dark' },
  rust: { name: 'Ruggine', hex: '#A04020', warmth: 'warm', tone: 'medium' },
  terracotta: { name: 'Terracotta', hex: '#B65A3C', warmth: 'warm', tone: 'medium' },
  coral: { name: 'Corallo', hex: '#E07856', warmth: 'warm', tone: 'medium' },
  peach: { name: 'Pesca', hex: '#F0B090', warmth: 'warm', tone: 'light' },
  red: { name: 'Rosso', hex: '#B83232', warmth: 'warm', tone: 'medium' },
  redbright: { name: 'Rosso acceso', hex: '#D83030', warmth: 'warm', tone: 'medium' },
  burgundy: { name: 'Bordeaux', hex: '#5C1A1A', warmth: 'warm', tone: 'dark' },
  wine: { name: 'Vinaccia', hex: '#722030', warmth: 'warm', tone: 'dark' },
  pink: { name: 'Rosa', hex: '#E8A0B0', warmth: 'warm', tone: 'light' },
  pinkdusty: { name: 'Rosa antico', hex: '#C49090', warmth: 'warm', tone: 'medium' },
  pinkbright: { name: 'Rosa acceso', hex: '#F060A0', warmth: 'cool', tone: 'medium' },
  fuchsia: { name: 'Fucsia', hex: '#C8307C', warmth: 'cool', tone: 'medium' },
  purple: { name: 'Viola', hex: '#5C3A6B', warmth: 'cool', tone: 'dark' },
  lilac: { name: 'Lilla', hex: '#B098C0', warmth: 'cool', tone: 'light' },
  lavender: { name: 'Lavanda', hex: '#9088B8', warmth: 'cool', tone: 'medium' },
  olive: { name: 'Oliva', hex: '#6B7C4E', warmth: 'warm', tone: 'medium' },
  olivelight: { name: 'Oliva chiaro', hex: '#8B9C6C', warmth: 'warm', tone: 'medium' },
  khaki: { name: 'Khaki', hex: '#8B7C50', warmth: 'warm', tone: 'medium' },
  moss: { name: 'Muschio', hex: '#5C6B3A', warmth: 'warm', tone: 'medium' },
  darkgreen: { name: 'Verde scuro', hex: '#2A3A2A', warmth: 'warm', tone: 'dark' },
  green: { name: 'Verde', hex: '#5C7A40', warmth: 'warm', tone: 'medium' },
  forest: { name: 'Verde foresta', hex: '#284028', warmth: 'warm', tone: 'dark' },
  emerald: { name: 'Smeraldo', hex: '#1C7050', warmth: 'cool', tone: 'medium' },
  mint: { name: 'Menta', hex: '#A0D0B8', warmth: 'cool', tone: 'light' },
  sage: { name: 'Salvia', hex: '#A0B098', warmth: 'cool', tone: 'medium' },
  teal: { name: 'Teal', hex: '#2C6B70', warmth: 'cool', tone: 'medium' },
  turquoise: { name: 'Turchese', hex: '#3CA8B0', warmth: 'cool', tone: 'medium' },
  cyan: { name: 'Ciano', hex: '#5CB8D0', warmth: 'cool', tone: 'medium' },
  skyblue: { name: 'Celeste', hex: '#8CC0DC', warmth: 'cool', tone: 'light' },
  bluepowder: { name: 'Blu polvere', hex: '#B0C4D8', warmth: 'cool', tone: 'light' },
  bluelight: { name: 'Azzurro', hex: '#6A8FAF', warmth: 'cool', tone: 'medium' },
  bluemed: { name: 'Blu medio', hex: '#3A5A7A', warmth: 'cool', tone: 'medium' },
  blueroyal: { name: 'Blu royal', hex: '#1E40A0', warmth: 'cool', tone: 'medium' },
  bluedenim: { name: 'Blu denim', hex: '#2C3E6B', warmth: 'cool', tone: 'dark' },
  navy: { name: 'Blu navy', hex: '#1E2D40', warmth: 'cool', tone: 'dark' },
  midnight: { name: 'Mezzanotte', hex: '#0F1A2C', warmth: 'cool', tone: 'dark' },
  yellow: { name: 'Giallo', hex: '#E8C040', warmth: 'warm', tone: 'medium' },
  yellowpale: { name: 'Giallo pallido', hex: '#F0E090', warmth: 'warm', tone: 'light' },
  orange: { name: 'Arancione', hex: '#E07820', warmth: 'warm', tone: 'medium' },
  orangelight: { name: 'Arancione chiaro', hex: '#F0A868', warmth: 'warm', tone: 'light' },
  graylight: { name: 'Grigio chiaro', hex: '#C8C6C0', warmth: 'cool', tone: 'light' },
  graypearl: { name: 'Grigio perla', hex: '#A8A8A4', warmth: 'cool', tone: 'medium' },
  graymed: { name: 'Grigio', hex: '#6B6B6B', warmth: 'cool', tone: 'medium' },
  graydark: { name: 'Grigio scuro', hex: '#4A4A48', warmth: 'cool', tone: 'dark' },
  charcoal: { name: 'Antracite', hex: '#3A3A38', warmth: 'neutral', tone: 'dark' },
  black: { name: 'Nero', hex: '#1A1A1A', warmth: 'cool', tone: 'dark' },
  blackjet: { name: 'Nero pece', hex: '#000000', warmth: 'cool', tone: 'dark' },
  silver: { name: 'Argento', hex: '#B8B8B0', warmth: 'cool', tone: 'medium' },
  gold: { name: 'Oro', hex: '#B89040', warmth: 'warm', tone: 'medium' },
};

const TYPES = {
  tshirt: { name: 'T-shirt', category: 'top', layer: 0 },
  shirt: { name: 'Camicia', category: 'top', layer: 1 },
  sweater: { name: 'Maglione', category: 'top', layer: 1 },
  cardigan: { name: 'Cardigan', category: 'outer', layer: 2 },
  polo_knit: { name: 'Polo in maglia', category: 'top', layer: 1 },
  overshirt: { name: 'Overshirt', category: 'outer', layer: 2 },
  jacket: { name: 'Giacca', category: 'outer', layer: 3 },
  jeans: { name: 'Jeans', category: 'bottom', layer: 0 },
  pants: { name: 'Pantaloni', category: 'bottom', layer: 0 },
  shoes: { name: 'Scarpe', category: 'footwear', layer: 0 },
};

// Sottotipi per ogni tipologia, con punteggio stilistico:
// 1.0 = perfettamente nel tuo stile (menswear minimalista europeo)
// 0.85 = neutro, si integra senza problemi
// 0.6 = fuori stile, va usato con cautela
const SUBTYPES = {
  tshirt: {
    crew: { name: 'Crewneck', style: 1.0 },
    boxy: { name: 'Boxy', style: 1.0 },
    relaxed: { name: 'Relaxed', style: 1.0 },
    pocket: { name: 'Con taschino', style: 0.95 },
    henley: { name: 'Henley', style: 0.9 },
    vneck: { name: 'V-neck', style: 0.7 },
    slim: { name: 'Slim fit', style: 0.6 },
    graphic: { name: 'Con stampa', style: 0.6 },
    longsleeve: { name: 'Maniche lunghe', style: 0.95 },
  },
  shirt: {
    oxford: { name: 'Oxford', style: 1.0 },
    flannel: { name: 'Flanella', style: 0.95 },
    linen: { name: 'Lino', style: 1.0 },
    band: { name: 'Coreana', style: 0.95 },
    western: { name: 'Western', style: 0.7 },
    short_sleeve: { name: 'Manica corta', style: 0.9 },
    slim_dress: { name: 'Slim dress', style: 0.65 },
  },
  sweater: {
    crewneck: { name: 'Girocollo', style: 1.0 },
    rollneck: { name: 'Rollneck/lupetto', style: 1.0 },
    mockneck: { name: 'Mock neck', style: 1.0 },
    ribbed: { name: 'A coste', style: 0.95 },
    chunky: { name: 'Chunky knit', style: 1.0 },
    fineknit: { name: 'Fine knit', style: 0.95 },
    vneck: { name: 'V-neck', style: 0.75 },
    quarter_zip: { name: 'Quarter zip', style: 0.7 },
    hoodie: { name: 'Hoodie', style: 0.6 },
  },
  cardigan: {
    classic: { name: 'Classico V-neck', style: 1.0 },
    shawl: { name: 'Shawl collar', style: 1.0 },
    oversized: { name: 'Oversize', style: 1.0 },
    grandpa: { name: 'Grandpa', style: 1.0 },
    cropped: { name: 'Cropped', style: 0.75 },
    zipped: { name: 'Con zip', style: 0.75 },
  },
  polo_knit: {
    classic_polo: { name: 'Polo classico', style: 1.0 },
    open_collar: { name: 'Collo aperto', style: 1.0 },
    long_sleeve_polo: { name: 'Manica lunga', style: 1.0 },
    rugby: { name: 'Rugby', style: 0.85 },
  },
  overshirt: {
    chore: { name: 'Chore coat', style: 1.0 },
    cpo: { name: 'CPO/lana', style: 1.0 },
    flannel_over: { name: 'Flanella oversize', style: 0.95 },
    workwear: { name: 'Workwear', style: 0.95 },
    denim_jacket: { name: 'Giacca jeans', style: 0.8 },
  },
  jacket: {
    field: { name: 'Field jacket', style: 1.0 },
    tweed: { name: 'Tweed', style: 1.0 },
    unstructured_blazer: { name: 'Blazer destrutturato', style: 1.0 },
    harrington: { name: 'Harrington', style: 0.95 },
    trench: { name: 'Trench', style: 0.95 },
    peacoat: { name: 'Peacoat', style: 0.95 },
    bomber: { name: 'Bomber', style: 0.75 },
    blazer_classic: { name: 'Blazer classico', style: 0.8 },
    leather: { name: 'Pelle', style: 0.7 },
    puffer: { name: 'Piumino', style: 0.6 },
    windbreaker: { name: 'Windbreaker', style: 0.55 },
  },
  jeans: {
    straight: { name: 'Straight', style: 1.0 },
    relaxed_jeans: { name: 'Relaxed', style: 1.0 },
    tapered: { name: 'Tapered', style: 0.95 },
    wide: { name: 'Wide leg', style: 0.95 },
    loose: { name: 'Loose', style: 0.9 },
    regular: { name: 'Regular', style: 0.9 },
    slim: { name: 'Slim', style: 0.7 },
    skinny: { name: 'Skinny', style: 0.5 },
    baggy: { name: 'Baggy', style: 0.7 },
    bootcut: { name: 'Bootcut', style: 0.65 },
    cropped_jeans: { name: 'Cropped', style: 0.85 },
  },
  pants: {
    chino: { name: 'Chino', style: 1.0 },
    trousers: { name: 'Trousers/sartoriali', style: 1.0 },
    pleated: { name: 'Con pinces', style: 1.0 },
    tapered_pants: { name: 'Tapered', style: 0.95 },
    straight_pants: { name: 'Straight', style: 1.0 },
    wide_pants: { name: 'Wide leg', style: 0.95 },
    cargo: { name: 'Cargo', style: 0.8 },
    drawstring: { name: 'Drawstring', style: 0.9 },
    jogger: { name: 'Jogger', style: 0.5 },
    skinny_pants: { name: 'Skinny', style: 0.5 },
    cropped_pants: { name: 'Cropped', style: 0.95 },
  },
  shoes: {
    desert_boot: { name: 'Desert boot', style: 1.0 },
    chukka: { name: 'Chukka', style: 1.0 },
    chelsea: { name: 'Chelsea boot', style: 1.0 },
    derby: { name: 'Derby', style: 1.0 },
    loafer: { name: 'Loafer', style: 1.0 },
    boots: { name: 'Boots', style: 0.9 },
    sneaker_clean: { name: 'Sneaker minimal', style: 1.0 },
    sneaker_retro: { name: 'Sneaker retro/terrace', style: 0.95 },
    sneaker_low: { name: 'Sneaker low (canvas)', style: 0.85 },
    sneaker_running: { name: 'Running/tecnica', style: 0.55 },
    sneaker_chunky: { name: 'Sneaker chunky', style: 0.55 },
    monk: { name: 'Monk strap', style: 0.85 },
    oxford: { name: 'Oxford', style: 0.9 },
  },
};

const SEASONS = {
  hot: { name: 'Caldo', layers: [0] },
  warm: { name: 'Mite', layers: [0, 1] },
  cool: { name: 'Fresco', layers: [0, 1, 2] },
  cold: { name: 'Freddo', layers: [0, 1, 2, 3] },
};

const SEASON_TYPES = {
  hot: ['tshirt', 'jeans', 'pants', 'shoes'],
  warm: ['tshirt', 'shirt', 'polo_knit', 'jeans', 'pants', 'shoes'],
  cool: ['tshirt', 'shirt', 'sweater', 'cardigan', 'polo_knit', 'overshirt', 'jeans', 'pants', 'shoes'],
  cold: ['tshirt', 'shirt', 'sweater', 'cardigan', 'polo_knit', 'overshirt', 'jacket', 'jeans', 'pants', 'shoes'],
};

const TEXTURES = ['Cotone', 'Lino', 'Lana', 'Maglia', 'Velluto a coste', 'Flanella', 'Denim', 'Suede', 'Tweed', 'Pelle', 'Tela'];

// Classificazione dei materiali per stagionalità e formalità
// Permette di rilevare combinazioni incoerenti (es. lino + flanella, suede in piena estate)
const TEXTURE_WEIGHT = {
  Lino: 'light', Cotone: 'medium', Tela: 'light',
  Denim: 'medium', Maglia: 'medium',
  Lana: 'heavy', Flanella: 'heavy', 'Velluto a coste': 'heavy', Tweed: 'heavy',
  Suede: 'medium', Pelle: 'medium',
};

// Compatibilità fra materiali: penalità per combinazioni stagionalmente incoerenti
// Lino e flanella/tweed/velluto sono semanticamente lontani (estate vs autunno/inverno)
const TEXTURE_CONFLICTS = [
  ['Lino', 'Flanella'],
  ['Lino', 'Tweed'],
  ['Lino', 'Velluto a coste'],
  ['Lino', 'Lana'],
  ['Tela', 'Tweed'],
  ['Tela', 'Velluto a coste'],
];

function texturePair(t1, t2) {
  if (!t1 || !t2 || t1 === t2) return 1.0;
  const conflict = TEXTURE_CONFLICTS.some(([a, b]) =>
    (a === t1 && b === t2) || (a === t2 && b === t1)
  );
  if (conflict) return 0.5;
  // due "heavy" insieme va bene, due "light" anche, mix di estremi va meglio dei conflitti
  return 0.9;
}

function outfitTextureScore(items) {
  if (items.length < 2) return 1.0;
  let total = 0, pairs = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      total += texturePair(items[i].texture, items[j].texture);
      pairs++;
    }
  }
  return pairs > 0 ? total / pairs : 1.0;
}

function hasTextureConflict(items) {
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const conflict = TEXTURE_CONFLICTS.some(([a, b]) =>
        (a === items[i].texture && b === items[j].texture) ||
        (a === items[j].texture && b === items[i].texture)
      );
      if (conflict) return true;
    }
  }
  return false;
}

const INITIAL_WARDROBE = [
  { id: 'w1', type: 'jeans', subtype: 'straight', color: 'bluelight', texture: 'Denim', notes: 'Azzurri' },
  { id: 'w2', type: 'jeans', subtype: 'straight', color: 'bluedenim', texture: 'Denim', notes: 'Blu scuro' },
  { id: 'w3', type: 'jeans', subtype: 'straight', color: 'graymed', texture: 'Denim', notes: 'Grigi' },
  { id: 'w4', type: 'jeans', subtype: 'straight', color: 'burgundy', texture: 'Denim', notes: 'Bordeaux' },
  { id: 'w5', type: 'pants', subtype: 'chino', color: 'darkgreen', texture: 'Cotone', notes: 'Verde molto scuro' },
  { id: 'w6', type: 'pants', subtype: 'trousers', color: 'brown', texture: 'Lino', notes: 'Lino marrone' },
  { id: 'w7', type: 'pants', subtype: 'trousers', color: 'navy', texture: 'Lino', notes: 'Lino blu navy' },
  { id: 'w8', type: 'pants', subtype: 'straight_pants', color: 'beige', texture: 'Velluto a coste', notes: 'Coste beige' },
  { id: 'w9', type: 'sweater', subtype: 'crewneck', color: 'green', texture: 'Maglia', notes: '' },
  { id: 'w10', type: 'sweater', subtype: 'crewneck', color: 'brown', texture: 'Maglia', notes: '' },
  { id: 'w11', type: 'sweater', subtype: 'crewneck', color: 'beige', texture: 'Maglia', notes: '' },
  { id: 'w12', type: 'sweater', subtype: 'crewneck', color: 'burgundy', texture: 'Maglia', notes: '' },
  { id: 'w13', type: 'sweater', subtype: 'crewneck', color: 'navy', texture: 'Maglia', notes: '' },
  { id: 'w14', type: 'sweater', subtype: 'crewneck', color: 'bluemed', texture: 'Maglia', notes: 'Blu medio' },
  { id: 'w15', type: 'shirt', subtype: 'flannel', color: 'burgundy', texture: 'Flanella', notes: 'A quadri rosso/navy' },
  { id: 'w16', type: 'shirt', subtype: 'flannel', color: 'bluemed', texture: 'Flanella', notes: 'Azzurro scuro' },
  { id: 'w17', type: 'shirt', subtype: 'linen', color: 'navy', texture: 'Lino', notes: '' },
  { id: 'w18', type: 'tshirt', subtype: 'crew', color: 'graymed', texture: 'Cotone', notes: '' },
  { id: 'w19', type: 'tshirt', subtype: 'crew', color: 'white', texture: 'Cotone', notes: '' },
  { id: 'w20', type: 'tshirt', subtype: 'crew', color: 'green', texture: 'Cotone', notes: '' },
  { id: 'w21', type: 'tshirt', subtype: 'crew', color: 'navy', texture: 'Cotone', notes: 'Slavata' },
];

const INITIAL_WISHLIST = [
  { id: 'wl1', type: 'shoes', subtype: 'desert_boot', color: 'sand', texture: 'Suede', notes: 'Desert boot — Clarks Desert Boot', priority: 1 },
  { id: 'wl2', type: 'shoes', subtype: 'sneaker_retro', color: 'cream', texture: 'Pelle', notes: 'Sneaker low avorio — Adidas Gazelle / NB 574', priority: 2 },
  { id: 'wl3', type: 'pants', subtype: 'trousers', color: 'charcoal', texture: 'Velluto a coste', notes: 'Antracite, taglio dritto', priority: 3 },
  { id: 'wl4', type: 'sweater', subtype: 'crewneck', color: 'charcoal', texture: 'Lana', notes: 'Girocollo merino — Uniqlo Extra Fine', priority: 4 },
  { id: 'wl5', type: 'pants', subtype: 'chino', color: 'olive', texture: 'Cotone', notes: 'Twill oliva', priority: 5 },
  { id: 'wl6', type: 'cardigan', subtype: 'oversized', color: 'beige', texture: 'Lana', notes: 'Oversize, oatmeal', priority: 6 },
  { id: 'wl7', type: 'overshirt', subtype: 'cpo', color: 'olive', texture: 'Lana', notes: 'Tinta unita', priority: 7 },
  { id: 'wl8', type: 'polo_knit', subtype: 'classic_polo', color: 'taupe', texture: 'Maglia', notes: 'Grigio tortora', priority: 8 },
  { id: 'wl9', type: 'tshirt', subtype: 'crew', color: 'cream', texture: 'Cotone', notes: 'Pesante, crema', priority: 9 },
  { id: 'wl10', type: 'jacket', subtype: 'tweed', color: 'tobacco', texture: 'Tweed', notes: 'Chore jacket — pezzo finale', priority: 10 },
];

const PALETTE_WARM = ['cream', 'ivory', 'ecru', 'beige', 'sand', 'taupe', 'camel', 'caramel', 'mustard', 'ochre', 'tobacco', 'brown', 'chocolate', 'darkbrown', 'rust', 'terracotta', 'olive', 'olivelight', 'khaki', 'moss', 'darkgreen', 'green', 'forest', 'burgundy', 'wine', 'navy', 'charcoal', 'gold'];
const PALETTE_NEUTRAL = ['charcoal', 'graydark', 'graymed', 'graypearl', 'graylight', 'silver', 'white', 'cream', 'ivory', 'ecru', 'taupe', 'black'];

const COLOR_GROUPS = [
  { name: 'Bianchi e neutri chiari', keys: ['whitepure', 'white', 'cream', 'ivory', 'ecru', 'beige'] },
  { name: 'Sabbia e tortora', keys: ['sand', 'taupe', 'camel', 'caramel', 'khaki'] },
  { name: 'Marroni e terre', keys: ['mustard', 'ochre', 'tobacco', 'brown', 'chocolate', 'darkbrown', 'gold'] },
  { name: 'Rossi e aranciati', keys: ['rust', 'terracotta', 'coral', 'peach', 'orange', 'orangelight', 'red', 'redbright'] },
  { name: 'Vinaccia e rosa', keys: ['burgundy', 'wine', 'pinkdusty', 'pink', 'pinkbright', 'fuchsia'] },
  { name: 'Viola', keys: ['purple', 'lavender', 'lilac'] },
  { name: 'Verdi', keys: ['darkgreen', 'forest', 'moss', 'olive', 'olivelight', 'green', 'sage', 'mint', 'emerald'] },
  { name: 'Blu e azzurri', keys: ['midnight', 'navy', 'bluedenim', 'blueroyal', 'bluemed', 'bluelight', 'skyblue', 'bluepowder', 'teal', 'turquoise', 'cyan'] },
  { name: 'Gialli', keys: ['yellow', 'yellowpale'] },
  { name: 'Grigi e neri', keys: ['graylight', 'graypearl', 'silver', 'graymed', 'graydark', 'charcoal', 'black', 'blackjet'] },
];

// ─── Classificazione colori ────────────────────────────────────────────────
// Ogni colore appartiene a una "famiglia cromatica" per rilevare conflitti
const COLOR_FAMILY = {
  // Neutri — si abbinano con tutto
  whitepure:'neutral', white:'neutral', cream:'neutral', ivory:'neutral', ecru:'neutral',
  graylight:'neutral', graypearl:'neutral', silver:'neutral', graymed:'neutral',
  graydark:'neutral', charcoal:'neutral', black:'neutral', blackjet:'neutral',
  // Terra — si abbinano fra loro e coi neutri
  beige:'earth', sand:'earth', taupe:'earth', camel:'earth', caramel:'earth',
  khaki:'earth', tobacco:'earth', brown:'earth', chocolate:'earth', darkbrown:'earth',
  mustard:'earth', ochre:'earth', gold:'earth',
  // Verde — conflitto con rossi/bordeaux, ok con neutri/terra/navy
  darkgreen:'green', forest:'green', moss:'green', olive:'green', olivelight:'green',
  green:'green', sage:'green', mint:'green', emerald:'green',
  // Blu — ancora versatile, si abbina a quasi tutto
  midnight:'blue', navy:'blue', bluedenim:'blue', blueroyal:'blue', bluemed:'blue',
  bluelight:'blue', skyblue:'blue', bluepowder:'blue', teal:'blue', turquoise:'blue', cyan:'blue',
  // Rosso/bordeaux — conflitto con verde vivo e con altri accenti forti
  rust:'red', terracotta:'red', coral:'red', red:'red', redbright:'red',
  burgundy:'red', wine:'red',
  // Arancio/pesca — conflitto con rossi forti e bordeaux scuri
  peach:'orange', orange:'orange', orangelight:'orange',
  // Giallo — accento forte, conflitto con viola e rossi
  yellow:'yellow', yellowpale:'yellow',
  // Rosa/fucsia
  pink:'pink', pinkdusty:'pink', pinkbright:'pink', fuchsia:'pink',
  // Viola
  purple:'purple', lavender:'purple', lilac:'purple',
};

// Matrice di compatibilità fra famiglie
// Le combinazioni "famiglia + stessa famiglia" sono volutamente abbassate:
// indossare due capi della stessa famiglia non-neutra è da segnalare
const FAMILY_COMPAT = {
  neutral: { neutral:0.95, earth:0.95, green:0.95, blue:0.95, red:0.9, orange:0.9, yellow:0.85, pink:0.85, purple:0.85 },
  earth:   { neutral:0.95, earth:0.7,  green:0.85, blue:0.85, red:0.7,  orange:0.75, yellow:0.7, pink:0.6, purple:0.6 },
  green:   { neutral:0.95, earth:0.85, green:0.6,  blue:0.85, red:0.3,  orange:0.5,  yellow:0.6, pink:0.4, purple:0.6 },
  blue:    { neutral:0.95, earth:0.85, green:0.85, blue:0.6,  red:0.7,  orange:0.65, yellow:0.65, pink:0.7, purple:0.75 },
  red:     { neutral:0.9,  earth:0.7,  green:0.3,  blue:0.7,  red:0.5,  orange:0.4,  yellow:0.5, pink:0.4, purple:0.55 },
  orange:  { neutral:0.9,  earth:0.75, green:0.5,  blue:0.65, red:0.4,  orange:0.55, yellow:0.7, pink:0.5, purple:0.5 },
  yellow:  { neutral:0.85, earth:0.7,  green:0.6,  blue:0.65, red:0.5,  orange:0.7,  yellow:0.55, pink:0.5, purple:0.4 },
  pink:    { neutral:0.85, earth:0.6,  green:0.4,  blue:0.7,  red:0.4,  orange:0.5,  yellow:0.5, pink:0.55, purple:0.7 },
  purple:  { neutral:0.85, earth:0.6,  green:0.6,  blue:0.75, red:0.55, orange:0.5,  yellow:0.4, pink:0.7, purple:0.55 },
};

function getFamily(colorKey) {
  return COLOR_FAMILY[colorKey] || 'neutral';
}

function pairScore(c1, c2) {
  if (c1 === c2) return 0.5;
  const f1 = getFamily(c1), f2 = getFamily(c2);
  if (c1 === c2 && f1 === 'neutral') return 0.9;
  return FAMILY_COMPAT[f1]?.[f2] ?? FAMILY_COMPAT[f2]?.[f1] ?? 0.5;
}

// True se nell'outfit ci sono almeno 2 capi appartenenti alla stessa famiglia non-neutra
function hasSameFamily(items) {
  const counts = {};
  for (const i of items) {
    const f = getFamily(i.color);
    if (f === 'neutral') continue;
    counts[f] = (counts[f] || 0) + 1;
    if (counts[f] >= 2) return true;
  }
  return false;
}

// Score globale di un outfit: considera coppie + regola "max 1 accento"
function outfitColorScore(items) {
  if (items.length < 2) return 1.0;
  const ACCENT_FAMILIES = new Set(['red','orange','yellow','pink','purple','green']);
  // conta quante famiglie accento distinte ci sono (esclusi neutri, terra, blu)
  const accents = new Set(
    items
      .map(i => getFamily(i.color))
      .filter(f => ACCENT_FAMILIES.has(f))
  );
  // più di 1 famiglia accento = penalità progressiva
  const accentPenalty = accents.size <= 1 ? 1.0 : accents.size === 2 ? 0.7 : 0.4;

  let total = 0, pairs = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      total += pairScore(items[i].color, items[j].color);
      pairs++;
    }
  }
  const pairAvg = pairs > 0 ? total / pairs : 1.0;
  return pairAvg * accentPenalty;
}

function styleScore(item) {
  if (!item.subtype) return 0.9;
  const sub = SUBTYPES[item.type]?.[item.subtype];
  return sub ? sub.style : 0.9;
}

function areCompatible(item1, item2) {
  if (item1.id === item2.id) return false;
  const t1 = TYPES[item1.type], t2 = TYPES[item2.type];
  if (!t1 || !t2) return false;
  if (t1.category === t2.category && t1.category !== 'top' && t1.category !== 'outer') return false;
  if (t1.category === 'top' && t2.category === 'top' && t1.layer === t2.layer) return false;
  if (styleScore(item1) < 0.65 || styleScore(item2) < 0.65) return false;
  if (pairScore(item1.color, item2.color) < 0.6) return false;
  if (texturePair(item1.texture, item2.texture) < 0.6) return false;
  return true;
}

function suggestionScore(items) {
  if (items.length < 2) return { score: 0, sameFamily: false, textureConflict: false };
  const colorAvg = outfitColorScore(items);
  const styleAvg = items.reduce((s, i) => s + styleScore(i), 0) / items.length;
  const textureAvg = outfitTextureScore(items);
  // peso: 55% colori, 25% stile, 20% materiali
  const score = colorAvg * 0.55 + styleAvg * 0.25 + textureAvg * 0.2;
  return {
    score,
    sameFamily: hasSameFamily(items),
    textureConflict: hasTextureConflict(items),
  };
}

// Genera outfit completi automaticamente per una stagione
// Strategia: pesca un bottom, una scarpa, un top (layer 0 o 1) e — se freddo — un outer
// Massimizza lo score e privilegia capi nel tuo stile
function generateOutfits(wardrobe, season, count = 5) {
  const seasonTypes = SEASON_TYPES[season] || [];
  const pool = wardrobe.filter(i => seasonTypes.includes(i.type));

  const byCategory = { top: [], outer: [], bottom: [], footwear: [] };
  for (const item of pool) {
    const cat = TYPES[item.type]?.category;
    if (cat && byCategory[cat]) byCategory[cat].push(item);
  }

  // se manca una categoria essenziale, non genero
  if (!byCategory.top.length || !byCategory.bottom.length || !byCategory.footwear.length) {
    return [];
  }

  const needsOuter = season === 'cold' || season === 'cool';
  const generated = [];
  const seen = new Set();

  // tento più combinazioni e tengo solo quelle valide
  const maxAttempts = Math.min(150, byCategory.top.length * byCategory.bottom.length * byCategory.footwear.length);
  let attempts = 0;

  while (generated.length < count * 4 && attempts < maxAttempts) {
    attempts++;
    const top = byCategory.top[Math.floor(Math.random() * byCategory.top.length)];
    const bottom = byCategory.bottom[Math.floor(Math.random() * byCategory.bottom.length)];
    const shoes = byCategory.footwear[Math.floor(Math.random() * byCategory.footwear.length)];
    const items = [top, bottom, shoes];

    if (needsOuter && byCategory.outer.length > 0 && Math.random() > 0.3) {
      const outer = byCategory.outer[Math.floor(Math.random() * byCategory.outer.length)];
      items.push(outer);
    }

    const key = items.map(i => i.id).sort().join('|');
    if (seen.has(key)) continue;
    seen.add(key);

    // verifica che tutte le coppie siano compatibili
    let valid = true;
    for (let i = 0; i < items.length && valid; i++) {
      for (let j = i + 1; j < items.length && valid; j++) {
        if (!areCompatible(items[i], items[j])) valid = false;
      }
    }
    if (!valid) continue;

    const s = suggestionScore(items);
    if (s.score >= 0.75 && !s.sameFamily && !s.textureConflict) {
      generated.push({ items, score: s.score });
    }
  }

  // ordino per score decrescente e tengo i migliori unici
  generated.sort((a, b) => b.score - a.score);
  return generated.slice(0, count);
}

function ColorDot({ colorKey, size = 14 }) {
  const c = COLORS[colorKey];
  if (!c) return null;
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: c.hex,
        border: '0.5px solid rgba(0,0,0,0.12)',
        flexShrink: 0,
        verticalAlign: 'middle',
      }}
      title={c.name}
    />
  );
}

function itemLabel(item) {
  const type = TYPES[item.type]?.name || '';
  const sub = item.subtype ? SUBTYPES[item.type]?.[item.subtype]?.name : null;
  return sub ? `${type} ${sub}` : type;
}

function StyleBadge({ item, size = 'sm' }) {
  if (!item.subtype) return null;
  const s = SUBTYPES[item.type]?.[item.subtype]?.style;
  if (s === undefined) return null;
  if (s >= 0.9) return null; // non mostro nulla per i capi nel tuo stile
  const color = s >= 0.7 ? '#A87830' : '#A32D2D';
  const label = s >= 0.7 ? 'neutro' : 'fuori stile';
  return (
    <span style={{
      fontSize: 10,
      color,
      letterSpacing: '0.04em',
      padding: '1px 6px',
      border: `0.5px solid ${color}40`,
      borderRadius: 999,
      marginLeft: 6,
      verticalAlign: 'middle',
    }}>{label}</span>
  );
}

function App() {
  const [view, setView] = useState('wardrobe');
  const [wardrobe, setWardrobe] = useState(() => {
    try {
      const stored = window.storage ? null : localStorage.getItem('wardrobe_items');
      return stored ? JSON.parse(stored) : INITIAL_WARDROBE;
    } catch { return INITIAL_WARDROBE; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wardrobe_wishlist');
      return stored ? JSON.parse(stored) : INITIAL_WISHLIST;
    } catch { return INITIAL_WISHLIST; }
  });
  const [outfits, setOutfits] = useState(() => {
    try {
      const stored = localStorage.getItem('wardrobe_outfits');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => { try { localStorage.setItem('wardrobe_items', JSON.stringify(wardrobe)); } catch {} }, [wardrobe]);
  useEffect(() => { try { localStorage.setItem('wardrobe_wishlist', JSON.stringify(wishlist)); } catch {} }, [wishlist]);
  useEffect(() => { try { localStorage.setItem('wardrobe_outfits', JSON.stringify(outfits)); } catch {} }, [outfits]);

  const [dataDialog, setDataDialog] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  const exportData = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      wardrobe,
      wishlist,
      outfits,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date().toISOString().split('T')[0];
    a.download = `guardaroba-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    setImportError('');
    setImportSuccess('');
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.wardrobe || !Array.isArray(data.wardrobe)) throw new Error('File non valido: manca il guardaroba');
        const w = data.wardrobe;
        const wl = Array.isArray(data.wishlist) ? data.wishlist : [];
        const o = Array.isArray(data.outfits) ? data.outfits : [];
        setWardrobe(w);
        setWishlist(wl);
        setOutfits(o);
        setImportSuccess(`Importati ${w.length} capi, ${wl.length} wishlist, ${o.length} outfit`);
      } catch (err) {
        setImportError('Impossibile leggere il file: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter+Tight:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        html, body { background: #FAF8F3; color: #1F1E1A; font-family: 'Inter Tight', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .app { max-width: 720px; margin: 0 auto; min-height: 100vh; padding-bottom: 88px; }
        .header { padding: 28px 20px 16px; border-bottom: 0.5px solid rgba(0,0,0,0.08); position: sticky; top: 0; background: rgba(250,248,243,0.92); backdrop-filter: saturate(140%) blur(8px); z-index: 10; }
        .brand { font-family: 'Fraunces', serif; font-weight: 400; font-style: italic; font-size: 22px; letter-spacing: -0.01em; }
        .brand-sub { font-size: 11px; color: #8A8780; letter-spacing: 0.18em; text-transform: uppercase; margin-top: 4px; }
        .view-title { font-family: 'Fraunces', serif; font-weight: 400; font-size: 28px; letter-spacing: -0.02em; padding: 24px 20px 4px; }
        .view-sub { font-size: 13px; color: #8A8780; padding: 0 20px 20px; }
        .nav { position: fixed; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: rgba(250,248,243,0.96); backdrop-filter: saturate(140%) blur(12px); border-top: 0.5px solid rgba(0,0,0,0.08); }
        .nav-inner { display: flex; gap: 4px; background: #fff; border-radius: 999px; padding: 4px; border: 0.5px solid rgba(0,0,0,0.08); max-width: 100%; }
        .nav-btn { background: none; border: none; padding: 9px 16px; font-family: inherit; font-size: 13px; color: #6B685F; cursor: pointer; border-radius: 999px; transition: all 0.15s; white-space: nowrap; }
        .nav-btn.active { background: #1F1E1A; color: #F5F2EC; }
        .section { padding: 0 20px; }
        .filter-row { display: flex; gap: 6px; padding: 0 20px 14px; overflow-x: auto; scrollbar-width: none; }
        .filter-row::-webkit-scrollbar { display: none; }
        .chip { background: #fff; border: 0.5px solid rgba(0,0,0,0.1); padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; white-space: nowrap; color: #4A4842; transition: all 0.15s; font-family: inherit; }
        .chip.active { background: #1F1E1A; color: #F5F2EC; border-color: #1F1E1A; }
        .item-list { display: flex; flex-direction: column; gap: 1px; background: rgba(0,0,0,0.06); border-top: 0.5px solid rgba(0,0,0,0.06); border-bottom: 0.5px solid rgba(0,0,0,0.06); }
        .item { display: flex; align-items: center; gap: 14px; padding: 14px 20px; background: #FAF8F3; cursor: pointer; transition: background 0.15s; }
        .item:hover { background: #F2EFE8; }
        .item.selected { background: #F2EFE8; }
        .item-info { flex: 1; min-width: 0; }
        .item-title { font-size: 14px; color: #1F1E1A; display: flex; align-items: center; gap: 8px; }
        .item-meta { font-size: 12px; color: #8A8780; margin-top: 2px; }
        .item-actions { display: flex; gap: 6px; }
        .icon-btn { background: none; border: none; padding: 6px; cursor: pointer; color: #8A8780; font-family: inherit; font-size: 13px; border-radius: 6px; transition: all 0.15s; }
        .icon-btn:hover { background: rgba(0,0,0,0.04); color: #1F1E1A; }
        .fab { position: fixed; right: 16px; bottom: calc(80px + env(safe-area-inset-bottom)); background: #1F1E1A; color: #F5F2EC; border: none; width: 52px; height: 52px; border-radius: 50%; font-size: 22px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.12); display: flex; align-items: center; justify-content: center; font-family: inherit; }
        .modal-bg { position: fixed; inset: 0; background: rgba(20,18,14,0.5); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: flex-end; justify-content: center; animation: fade 0.2s ease; }
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal { background: #FAF8F3; width: 100%; max-width: 720px; max-height: 92vh; overflow-y: auto; border-radius: 20px 20px 0 0; padding: 24px 20px calc(24px + env(safe-area-inset-bottom)); animation: slide 0.25s ease; }
        @media (min-width: 720px) { .modal-bg { align-items: center; } .modal { border-radius: 20px; max-height: 86vh; } }
        .modal-title { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 400; margin-bottom: 20px; letter-spacing: -0.01em; }
        .field { margin-bottom: 16px; }
        .field-label { font-size: 11px; color: #8A8780; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
        select, input, textarea { width: 100%; padding: 11px 12px; border: 0.5px solid rgba(0,0,0,0.15); border-radius: 8px; background: #fff; font-family: inherit; font-size: 14px; color: #1F1E1A; outline: none; transition: border 0.15s; }
        select:focus, input:focus, textarea:focus { border-color: #1F1E1A; }
        .color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 8px; }
        .color-swatch { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 4px; border-radius: 8px; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; background: #fff; }
        .color-swatch.selected { border-color: #1F1E1A; background: #F2EFE8; }
        .color-swatch-circle { width: 24px; height: 24px; border-radius: 50%; border: 0.5px solid rgba(0,0,0,0.12); }
        .color-swatch-name { font-size: 10px; color: #4A4842; text-align: center; }
        .btn { background: #1F1E1A; color: #F5F2EC; border: none; padding: 12px 20px; border-radius: 999px; cursor: pointer; font-family: inherit; font-size: 14px; transition: all 0.15s; }
        .btn:hover { background: #000; }
        .btn-secondary { background: #fff; color: #1F1E1A; border: 0.5px solid rgba(0,0,0,0.15); }
        .btn-secondary:hover { background: #F2EFE8; }
        .btn-danger { background: #fff; color: #8B2C2C; border: 0.5px solid rgba(139,44,44,0.3); }
        .btn-row { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
        .btn-row .btn { flex: 1; min-width: 100px; }
        .empty { text-align: center; padding: 60px 20px; color: #8A8780; font-size: 14px; }
        .empty-title { font-family: 'Fraunces', serif; font-style: italic; font-size: 22px; color: #4A4842; margin-bottom: 8px; }
        .compat-section { background: #F5F2EC; margin: 14px 20px; border-radius: 12px; padding: 14px; }
        .compat-header { font-size: 11px; color: #6B685F; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
        .compat-list { display: flex; flex-direction: column; gap: 0; }
        .compat-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; cursor: pointer; }
        .compat-item:not(:last-child) { border-bottom: 0.5px solid rgba(0,0,0,0.06); }
        .compat-title { font-size: 13px; color: #1F1E1A; flex: 1; }
        .compat-add { background: none; border: 0.5px solid rgba(0,0,0,0.15); color: #1F1E1A; padding: 5px 10px; border-radius: 999px; font-size: 11px; cursor: pointer; font-family: inherit; }
        .compat-add.added { background: #1F1E1A; color: #F5F2EC; border-color: #1F1E1A; }
        .builder-canvas { padding: 16px 20px; min-height: 120px; background: linear-gradient(180deg, #F5F2EC 0%, transparent 100%); margin: 0 0 8px; }
        .builder-empty { color: #8A8780; font-size: 13px; font-style: italic; padding: 16px 0; text-align: center; }
        .builder-items { display: flex; flex-direction: column; gap: 8px; }
        .builder-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #fff; border-radius: 8px; border: 0.5px solid rgba(0,0,0,0.08); }
        .builder-item-title { flex: 1; font-size: 13px; }
        .builder-actions { display: flex; gap: 8px; padding: 0 20px 16px; }
        .score-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #6B685F; background: #fff; padding: 4px 10px; border-radius: 999px; border: 0.5px solid rgba(0,0,0,0.1); }
        .score-dot { width: 6px; height: 6px; border-radius: 50%; }
        .priority-badge { background: #1F1E1A; color: #F5F2EC; width: 20px; height: 20px; border-radius: 50%; font-size: 10px; display: inline-flex; align-items: center; justify-content: center; font-weight: 500; }
        .outfit-card { background: #fff; border: 0.5px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 14px 16px; margin: 8px 20px; cursor: pointer; }
        .outfit-name { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 400; margin-bottom: 6px; letter-spacing: -0.01em; }
        .outfit-dots { display: flex; gap: 4px; margin-bottom: 8px; }
        .outfit-meta { font-size: 12px; color: #8A8780; }
      `}</style>

      <Header onOpenData={() => setDataDialog(true)} />

      {view === 'wardrobe' && <WardrobeView wardrobe={wardrobe} setWardrobe={setWardrobe} />}
      {view === 'wishlist' && <WishlistView wishlist={wishlist} setWishlist={setWishlist} wardrobe={wardrobe} setWardrobe={setWardrobe} />}
      {view === 'builder' && <BuilderView wardrobe={wardrobe} outfits={outfits} setOutfits={setOutfits} />}
      {view === 'outfits' && <OutfitsView outfits={outfits} setOutfits={setOutfits} wardrobe={wardrobe} />}

      <Nav view={view} setView={setView} />

      {dataDialog && (
        <div className="modal-bg" onClick={() => { setDataDialog(false); setImportError(''); setImportSuccess(''); }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth: 480}}>
            <div className="modal-title">Backup e ripristino</div>
            <div style={{fontSize: 13, color: '#6B685F', lineHeight: 1.5, marginBottom: 20}}>
              Esporta tutti i tuoi dati (capi, wishlist, outfit) in un file JSON da conservare,
              oppure importa un backup precedente. L'import sostituisce tutti i dati attuali.
            </div>

            <div className="field">
              <div className="field-label">Esporta</div>
              <button className="btn btn-secondary" onClick={exportData} style={{width: '100%'}}>
                Scarica backup JSON
              </button>
              <div style={{fontSize: 11, color: '#8A8780', marginTop: 6}}>
                {wardrobe.length} capi · {wishlist.length} wishlist · {outfits.length} outfit
              </div>
            </div>

            <div className="field">
              <div className="field-label">Importa</div>
              <label className="btn btn-secondary" style={{width: '100%', textAlign: 'center', display: 'block', cursor: 'pointer'}}>
                Seleziona file JSON
                <input type="file" accept="application/json,.json" onChange={importData} style={{display: 'none'}} />
              </label>
              {importError && (
                <div style={{fontSize: 12, color: '#A32D2D', marginTop: 8}}>{importError}</div>
              )}
              {importSuccess && (
                <div style={{fontSize: 12, color: '#3B6D11', marginTop: 8}}>{importSuccess}</div>
              )}
            </div>

            <div className="btn-row">
              <button className="btn" onClick={() => { setDataDialog(false); setImportError(''); setImportSuccess(''); }} style={{flex: 1}}>Chiudi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ onOpenData }) {
  return (
    <div className="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <div>
        <div className="brand">Guardaroba</div>
        <div className="brand-sub">studio personale</div>
      </div>
      <button
        onClick={onOpenData}
        aria-label="Backup dati"
        style={{
          background: 'none',
          border: '0.5px solid rgba(0,0,0,0.15)',
          borderRadius: '50%',
          width: 32,
          height: 32,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 14,
          color: '#4A4842',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ⤓
      </button>
    </div>
  );
}

function Nav({ view, setView }) {
  const items = [
    { id: 'wardrobe', label: 'Capi' },
    { id: 'builder', label: 'Builder' },
    { id: 'outfits', label: 'Outfit' },
    { id: 'wishlist', label: 'Wishlist' },
  ];
  return (
    <div className="nav">
      <div className="nav-inner">
        {items.map(i => (
          <button key={i.id} className={'nav-btn' + (view === i.id ? ' active' : '')} onClick={() => setView(i.id)}>{i.label}</button>
        ))}
      </div>
    </div>
  );
}

function WardrobeView({ wardrobe, setWardrobe }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'top', label: 'Top' },
    { id: 'bottom', label: 'Pantaloni' },
    { id: 'outer', label: 'Esterni' },
    { id: 'footwear', label: 'Scarpe' },
  ];

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return wardrobe;
    return wardrobe.filter(i => TYPES[i.type]?.category === typeFilter);
  }, [wardrobe, typeFilter]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(item => {
      const cat = TYPES[item.type]?.category || 'other';
      if (!g[cat]) g[cat] = [];
      g[cat].push(item);
    });
    return g;
  }, [filtered]);

  const catOrder = ['top', 'outer', 'bottom', 'footwear'];
  const catNames = { top: 'Top', outer: 'Layer esterni', bottom: 'Pantaloni', footwear: 'Scarpe', other: 'Altro' };

  return (
    <>
      <div className="view-title">Il guardaroba</div>
      <div className="view-sub">{wardrobe.length} capi in totale</div>

      <div className="filter-row">
        {categories.map(c => (
          <button key={c.id} className={'chip' + (typeFilter === c.id ? ' active' : '')} onClick={() => setTypeFilter(c.id)}>{c.label}</button>
        ))}
      </div>

      {catOrder.map(cat => grouped[cat] && (
        <div key={cat}>
          <div style={{ fontSize: 11, color: '#8A8780', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '20px 20px 8px' }}>
            {catNames[cat]} · {grouped[cat].length}
          </div>
          <div className="item-list">
            {grouped[cat].map(item => (
              <div key={item.id} className="item" onClick={() => setEditing(item)}>
                <ColorDot colorKey={item.color} size={16} />
                <div className="item-info">
                  <div className="item-title">{itemLabel(item)}<StyleBadge item={item} /> {item.notes && <span style={{color: '#8A8780', fontSize: 13}}>· {item.notes}</span>}</div>
                  <div className="item-meta">{COLORS[item.color]?.name} · {item.texture}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="empty">
          <div className="empty-title">Vuoto</div>
          <div>Aggiungi il tuo primo capo</div>
        </div>
      )}

      <button className="fab" onClick={() => setAdding(true)} aria-label="Aggiungi capo">+</button>

      {(adding || editing) && (
        <ItemEditor
          item={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={(item) => {
            if (editing) setWardrobe(w => w.map(x => x.id === item.id ? item : x));
            else setWardrobe(w => [...w, { ...item, id: 'w' + Date.now() }]);
            setAdding(false); setEditing(null);
          }}
          onDelete={editing ? () => {
            setWardrobe(w => w.filter(x => x.id !== editing.id));
            setEditing(null);
          } : null}
        />
      )}
    </>
  );
}

function WishlistView({ wishlist, setWishlist, wardrobe, setWardrobe }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  const sorted = [...wishlist].sort((a, b) => (a.priority || 99) - (b.priority || 99));

  const moveToWardrobe = (item) => {
    const { priority, ...rest } = item;
    setWardrobe(w => [...w, { ...rest, id: 'w' + Date.now() }]);
    setWishlist(wl => wl.filter(x => x.id !== item.id));
  };

  return (
    <>
      <div className="view-title">Wishlist</div>
      <div className="view-sub">{wishlist.length} capi da acquistare, in ordine di priorità</div>

      <div className="item-list">
        {sorted.map(item => (
          <div key={item.id} className="item">
            <div className="priority-badge">{item.priority || '·'}</div>
            <ColorDot colorKey={item.color} size={16} />
            <div className="item-info" onClick={() => setEditing(item)} style={{cursor: 'pointer'}}>
              <div className="item-title">{itemLabel(item)}</div>
              <div className="item-meta">{COLORS[item.color]?.name} · {item.texture} {item.notes && '· ' + item.notes}</div>
            </div>
            <button className="compat-add" onClick={(e) => { e.stopPropagation(); moveToWardrobe(item); }}>Acquistato</button>
          </div>
        ))}
      </div>

      {wishlist.length === 0 && (
        <div className="empty">
          <div className="empty-title">Lista vuota</div>
          <div>Niente da comprare al momento</div>
        </div>
      )}

      <button className="fab" onClick={() => setAdding(true)} aria-label="Aggiungi alla wishlist">+</button>

      {(adding || editing) && (
        <ItemEditor
          item={editing}
          isWishlist
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={(item) => {
            if (editing) setWishlist(wl => wl.map(x => x.id === item.id ? item : x));
            else setWishlist(wl => [...wl, { ...item, id: 'wl' + Date.now(), priority: wl.length + 1 }]);
            setAdding(false); setEditing(null);
          }}
          onDelete={editing ? () => {
            setWishlist(wl => wl.filter(x => x.id !== editing.id));
            setEditing(null);
          } : null}
        />
      )}
    </>
  );
}

function BuilderView({ wardrobe, outfits, setOutfits }) {
  const [selected, setSelected] = useState([]);
  const [season, setSeason] = useState('cool');
  const [saveDialog, setSaveDialog] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [suggestDialog, setSuggestDialog] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggest = () => {
    const generated = generateOutfits(wardrobe, season, 5);
    setSuggestions(generated);
    setSuggestDialog(true);
  };

  const useSuggestion = (items) => {
    setSelected(items);
    setSuggestDialog(false);
  };

  const seasonTypes = SEASON_TYPES[season] || [];
  const seasonWardrobe = wardrobe.filter(i => seasonTypes.includes(i.type));

  const compatible = useMemo(() => {
    const base = selected.length === 0
      ? seasonWardrobe
      : seasonWardrobe.filter(item => {
          if (selected.find(s => s.id === item.id)) return false;
          return selected.every(s => areCompatible(s, item));
        });
    // ordino per punteggio stilistico decrescente: i capi più "in stile" vengono mostrati per primi
    return [...base].sort((a, b) => styleScore(b) - styleScore(a));
  }, [selected, seasonWardrobe]);

  const score = suggestionScore(selected);

  const toggle = (item) => {
    if (selected.find(s => s.id === item.id)) {
      setSelected(selected.filter(s => s.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  const save = () => {
    if (!outfitName.trim() || selected.length === 0) return;
    setOutfits(o => [...o, {
      id: 'o' + Date.now(),
      name: outfitName.trim(),
      itemIds: selected.map(s => s.id),
      season,
      created: Date.now(),
    }]);
    setSelected([]);
    setOutfitName('');
    setSaveDialog(false);
  };

  const grouped = useMemo(() => {
    const g = {};
    compatible.forEach(item => {
      const cat = TYPES[item.type]?.category || 'other';
      if (!g[cat]) g[cat] = [];
      g[cat].push(item);
    });
    return g;
  }, [compatible]);

  const catOrder = ['top', 'outer', 'bottom', 'footwear'];
  const catNames = { top: 'Top', outer: 'Layer esterni', bottom: 'Pantaloni', footwear: 'Scarpe' };

  return (
    <>
      <div className="view-title">Outfit builder</div>
      <div className="view-sub">Scegli un capo, vedi cosa si abbina</div>

      <div className="filter-row">
        {Object.entries(SEASONS).map(([k, v]) => (
          <button key={k} className={'chip' + (season === k ? ' active' : '')} onClick={() => setSeason(k)}>{v.name}</button>
        ))}
      </div>

      <div style={{padding: '0 20px 14px'}}>
        <button className="btn btn-secondary" onClick={handleSuggest} style={{width: '100%', padding: '10px 14px', fontSize: 13}}>
          ✨ Suggerisci 5 outfit
        </button>
      </div>

      <div className="builder-canvas">
        {selected.length === 0 ? (
          <div className="builder-empty">Seleziona un capo o tocca "Suggerisci"</div>
        ) : (
          <>
            <div className="builder-items">
              {selected.map(item => (
                <div key={item.id} className="builder-item">
                  <ColorDot colorKey={item.color} size={14} />
                  <span className="builder-item-title">{itemLabel(item)} · {COLORS[item.color]?.name}</span>
                  <button className="icon-btn" onClick={() => toggle(item)}>✕</button>
                </div>
              ))}
            </div>
            {selected.length >= 2 && (() => {
              const isConflict = score.score < 0.65;
              const isSameTone = !isConflict && score.sameFamily;
              const dotColor = isConflict ? '#A32D2D' : isSameTone ? '#C4924E' : '#5C7A40';
              const label = isConflict ? 'Conflitto colori' : isSameTone ? 'Stesso tono' : 'In armonia';
              return (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 8, flexWrap: 'wrap'}}>
                  <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
                    <span className="score-pill">
                      <span className="score-dot" style={{background: dotColor}} />
                      {label}
                    </span>
                    {score.textureConflict && (
                      <span className="score-pill" style={{color: '#8B6B1F'}}>
                        <span className="score-dot" style={{background: '#C4924E'}} />
                        Materiali da rivedere
                      </span>
                    )}
                  </div>
                  <button className="btn" onClick={() => setSaveDialog(true)} style={{padding: '8px 16px', fontSize: 13}}>Salva outfit</button>
                </div>
              );
            })()}
          </>
        )}
      </div>

      {selected.length > 0 && (
        <div style={{ fontSize: 11, color: '#8A8780', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 20px 8px' }}>
          Compatibili ({compatible.length})
        </div>
      )}

      {catOrder.map(cat => grouped[cat] && grouped[cat].length > 0 && (
        <div key={cat}>
          <div style={{ fontSize: 11, color: '#8A8780', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '16px 20px 6px' }}>
            {catNames[cat]}
          </div>
          <div className="item-list">
            {grouped[cat].map(item => (
              <div key={item.id} className="item" onClick={() => toggle(item)}>
                <ColorDot colorKey={item.color} size={16} />
                <div className="item-info">
                  <div className="item-title">{itemLabel(item)}<StyleBadge item={item} /> {item.notes && <span style={{color: '#8A8780', fontSize: 13}}>· {item.notes}</span>}</div>
                  <div className="item-meta">{COLORS[item.color]?.name} · {item.texture}</div>
                </div>
                <button className="compat-add">Aggiungi</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {compatible.length === 0 && selected.length > 0 && (
        <div className="empty">
          <div className="empty-title">Nessun abbinamento</div>
          <div>Prova a rimuovere un capo o cambiare stagione</div>
        </div>
      )}

      {saveDialog && (
        <div className="modal-bg" onClick={() => setSaveDialog(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth: 420}}>
            <div className="modal-title">Salva outfit</div>
            <div className="field">
              <div className="field-label">Nome</div>
              <input value={outfitName} onChange={e => setOutfitName(e.target.value)} placeholder="es. Casual autunno" autoFocus />
            </div>
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => setSaveDialog(false)}>Annulla</button>
              <button className="btn" onClick={save}>Salva</button>
            </div>
          </div>
        </div>
      )}

      {suggestDialog && (
        <div className="modal-bg" onClick={() => setSuggestDialog(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Outfit suggeriti · {SEASONS[season]?.name}</div>
            {suggestions.length === 0 ? (
              <div style={{padding: '20px 0', color: '#8A8780', fontSize: 14, lineHeight: 1.5}}>
                Non sono riuscito a generare outfit completi con i capi disponibili per questa stagione.
                Prova ad aggiungere più capi o a cambiare stagione.
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                {suggestions.map((sug, idx) => (
                  <div key={idx} style={{
                    background: '#fff',
                    border: '0.5px solid rgba(0,0,0,0.1)',
                    borderRadius: 12,
                    padding: '14px 16px',
                  }}>
                    <div style={{display: 'flex', gap: 5, marginBottom: 10}}>
                      {sug.items.map((item, i) => <ColorDot key={i} colorKey={item.color} size={16} />)}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12}}>
                      {sug.items.map(item => (
                        <div key={item.id} style={{fontSize: 13, color: '#1F1E1A'}}>
                          {itemLabel(item)} · <span style={{color: '#8A8780'}}>{COLORS[item.color]?.name}{item.notes ? ' · ' + item.notes : ''}</span>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-secondary" onClick={() => useSuggestion(sug.items)} style={{padding: '7px 14px', fontSize: 12}}>
                      Usa questo outfit
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => setSuggestDialog(false)}>Chiudi</button>
              <button className="btn" onClick={handleSuggest}>Rigenera</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function OutfitsView({ outfits, setOutfits, wardrobe }) {
  const [editing, setEditing] = useState(null);

  return (
    <>
      <div className="view-title">Outfit salvati</div>
      <div className="view-sub">{outfits.length} combinazioni</div>

      {outfits.length === 0 ? (
        <div className="empty">
          <div className="empty-title">Nessun outfit</div>
          <div>Crea il primo dal Builder</div>
        </div>
      ) : (
        outfits.map(outfit => {
          const items = outfit.itemIds.map(id => wardrobe.find(w => w.id === id)).filter(Boolean);
          return (
            <div key={outfit.id} className="outfit-card" onClick={() => setEditing(outfit)}>
              <div className="outfit-name">{outfit.name}</div>
              <div className="outfit-dots">
                {items.map((item, i) => <ColorDot key={i} colorKey={item.color} size={14} />)}
              </div>
              <div className="outfit-meta">
                {items.map(i => itemLabel(i)).join(' · ')}
                {outfit.season && ` · ${SEASONS[outfit.season]?.name}`}
              </div>
            </div>
          );
        })
      )}

      {editing && (
        <OutfitEditor
          outfit={editing}
          wardrobe={wardrobe}
          onClose={() => setEditing(null)}
          onSave={(updated) => {
            setOutfits(o => o.map(x => x.id === updated.id ? updated : x));
            setEditing(null);
          }}
          onDelete={() => {
            setOutfits(o => o.filter(x => x.id !== editing.id));
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

function OutfitEditor({ outfit, wardrobe, onClose, onSave, onDelete }) {
  const [name, setName] = useState(outfit.name);
  const [itemIds, setItemIds] = useState(outfit.itemIds);

  const items = itemIds.map(id => wardrobe.find(w => w.id === id)).filter(Boolean);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Modifica outfit</div>
        <div className="field">
          <div className="field-label">Nome</div>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="field">
          <div className="field-label">Capi ({items.length})</div>
          <div className="builder-items">
            {items.map(item => (
              <div key={item.id} className="builder-item">
                <ColorDot colorKey={item.color} size={14} />
                <span className="builder-item-title">{itemLabel(item)} · {COLORS[item.color]?.name}</span>
                <button className="icon-btn" onClick={() => setItemIds(ids => ids.filter(id => id !== item.id))}>✕</button>
              </div>
            ))}
          </div>
        </div>
        <div className="btn-row">
          <button className="btn btn-danger" onClick={onDelete}>Elimina</button>
          <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
          <button className="btn" onClick={() => onSave({ ...outfit, name, itemIds })}>Salva</button>
        </div>
      </div>
    </div>
  );
}

function ItemEditor({ item, onClose, onSave, onDelete, isWishlist }) {
  const [type, setType] = useState(item?.type || 'tshirt');
  const [subtype, setSubtype] = useState(item?.subtype || '');
  const [color, setColor] = useState(item?.color || 'navy');
  const [texture, setTexture] = useState(item?.texture || 'Cotone');
  const [notes, setNotes] = useState(item?.notes || '');
  const [priority, setPriority] = useState(item?.priority || '');

  // se cambio il tipo, resetto il sottotipo
  const handleTypeChange = (newType) => {
    setType(newType);
    setSubtype('');
  };

  const availableSubtypes = SUBTYPES[type] || {};
  const currentSubStyle = subtype ? availableSubtypes[subtype]?.style : null;

  const handleSave = () => {
    const data = { id: item?.id, type, color, texture, notes };
    if (subtype) data.subtype = subtype;
    if (isWishlist && priority) data.priority = parseInt(priority);
    onSave(data);
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{item ? 'Modifica capo' : 'Nuovo capo'}</div>

        <div className="field">
          <div className="field-label">Tipo</div>
          <select value={type} onChange={e => handleTypeChange(e.target.value)}>
            {Object.entries(TYPES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>

        {Object.keys(availableSubtypes).length > 0 && (
          <div className="field">
            <div className="field-label" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Taglio / fit</span>
              {currentSubStyle !== null && (
                <span style={{
                  fontSize: 10,
                  color: currentSubStyle >= 0.9 ? '#3B6D11' : currentSubStyle >= 0.7 ? '#8B6B1F' : '#791F1F',
                  letterSpacing: '0.06em',
                  textTransform: 'none',
                  fontWeight: 500
                }}>
                  {currentSubStyle >= 0.9 ? '◉ Nel tuo stile' : currentSubStyle >= 0.7 ? '○ Neutro' : '✕ Fuori stile'}
                </span>
              )}
            </div>
            <select value={subtype} onChange={e => setSubtype(e.target.value)}>
              <option value="">— Non specificato —</option>
              {Object.entries(availableSubtypes).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.name}{v.style >= 0.9 ? ' ◉' : v.style < 0.7 ? ' ✕' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="field">
          <div className="field-label">Colore</div>
          {COLOR_GROUPS.map(group => (
            <div key={group.name} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: '#A8A39A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{group.name}</div>
              <div className="color-grid">
                {group.keys.map(k => COLORS[k] && (
                  <div key={k} className={'color-swatch' + (color === k ? ' selected' : '')} onClick={() => setColor(k)}>
                    <div className="color-swatch-circle" style={{ background: COLORS[k].hex }} />
                    <div className="color-swatch-name">{COLORS[k].name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="field">
          <div className="field-label">Materiale</div>
          <select value={texture} onChange={e => setTexture(e.target.value)}>
            {TEXTURES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="field">
          <div className="field-label">Note</div>
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="opzionale" />
        </div>

        {isWishlist && (
          <div className="field">
            <div className="field-label">Priorità (numero)</div>
            <input type="number" min="1" value={priority} onChange={e => setPriority(e.target.value)} placeholder="es. 1" />
          </div>
        )}

        <div className="btn-row">
          {onDelete && <button className="btn btn-danger" onClick={onDelete}>Elimina</button>}
          <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
          <button className="btn" onClick={handleSave}>{item ? 'Salva' : 'Aggiungi'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
