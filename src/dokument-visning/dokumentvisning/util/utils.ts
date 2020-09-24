export const arr = (val : any) => Array.isArray(val) ? val : [ val ];

export const lagOffset = (lengde : number, liste : []) => {
    while (liste.length < lengde) {
        liste.push(liste[liste.length - 1]);
    }
    return liste;
};

export const zip = (liste1: [], liste2 : [], namespace : string) => {
    return liste1.map((element, index) => {
        element[namespace] = liste2[index];
        return element;
    });
};
