export const typingLessons = {
  // Level 1: jf - Home row position practice
  level1: {
    newCharacters: 'jf',
    description: 'Home row position - index fingers',
    words: [
      'ff jjj jf jfj j jff fjjf ff jfj j jff ff jjj fjj fjj fjf jfj jjj',
      'f fjjf jjj fjjf jfj fjjf f j fjj jff j fjj jf jjj fjjf f f fjf',
      'fjjf jff jjj ff jf fjjf fjjf f fjj fjj jf fjf j jj f j fjj jj jjj',
      'f jjj f fjjf j j jjj f j jjj jj ff fjf fjj f f ff jjj jj fjf f'
    ]
  },

  // Level 2: kd - Home row expansion
  level2: {
    newCharacters: 'kd',
    description: 'Home row position - middle fingers',
    words: [
      'jjd fdfj rd djd jk jd k dd fjk fd fk k jfkd dkkf fk dkd dd jk k',
      'dfj djd fkkk fk dff d dkkf fd fk fdfj fk k dkkf djd dff dkd dff',
      'dkd kdk k dkkf k jk fkkk jd k jfkd fk fk jd k d dkd jd k dd rd dffd',
      'd fk k k dff dff dd fk fk fd jd dd jjd rd dkd dkf kdk fdfj d kdk'
    ]
  },

  // Level 3: ls - Home row completion
  level3: {
    newCharacters: 'ls',
    description: 'Home row position - ring fingers',
    words: [
      'fl s l ldk l s slj s dks sf kl ll ls l ls dss lkj slk ks jl jjss',
      'l slj jl lkj l ldf s ld ll l ll ldk jjdl dlkk fl rs dss fld fl',
      'kl fl fl lkj fld ld fld js l dss kl jl jl ldk fld s ls s js kl',
      'll ld dss fld l rs sf dss ll jl kl ls slj kl ldf kl dss rs ls js'
    ]
  },

  // Level 4: ca - Common letter combinations
  level4: {
    newCharacters: 'ca',
    description: 'Common letter combinations',
    words: [
      'call rascals slacks flaks fads fad flack scads flask jackals flack',
      'sass all salsa jackals rad lads flaks scald ca la asks flack lacks',
      'ask ad jackal fas las sad sass skas ck ca fad fad adj fas kc dad',
      'jacks class lad scald cads jackal ad cads sack alas scald lacs flak'
    ]
  },

  // Level 5: nt - Building words
  level5: {
    newCharacters: 'nt',
    description: 'Building common words',
    words: [
      'catcall tn flanks last scans rands talc knack n cancans talk canst anal',
      'canst fan asst stats at natl stall stall alt rands snacks stand assn',
      'ants alt tads cantata talcs natl attack knacks stalks tack tact ltd',
      'rattan scan scandals fats rats tad talk stalks scats rank rats daft'
    ]
  }
};

// Helper function to get a random line from a specific level
export const getRandomLine = (level) => {
  const levelData = typingLessons[`level${level}`];
  if (!levelData) return typingLessons.level1.words[0];
  return levelData.words[Math.floor(Math.random() * levelData.words.length)];
};

// Helper function to get level info
export const getLevelInfo = (level) => {
  const levelData = typingLessons[`level${level}`];
  return {
    newCharacters: levelData?.newCharacters || '',
    description: levelData?.description || 'Practice typing',
  };
}; 