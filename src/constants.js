
export function position(x) {
  switch(x) {
    case 1: return 'Goalkeeper';
    case 2: return 'Defender';
    case 3: return 'Midfield';
    default: return 'Forward'
  }
}

export function team(x) {
  switch(x) {
    case 3: return 'Arsenal';
    case 7: return 'Aston Villa';
    case 91: return 'Bournemouth';
    case 36: return 'Brighton';
    case 90: return 'Burnley';
    case 8: return 'Chelsea';
    case 31: return 'Crystal Palace';
    case 11: return 'Everton';
    case 13: return 'Leicester';
    case 14: return 'Liverpool';
    case 43: return 'Man City';
    case 1: return 'Man United';
    case 4: return 'Newcastle';
    case 45: return 'Norwich';
    case 49: return 'Sheffield Utd';
    case 20: return 'Southampton';
    case 6: return 'Spurs';
    case 57: return 'Watford';
    case 21: return 'West Ham';
    default: return 'Wolves';
  }
}
