export const arr = (val) => Array.isArray(val) ? val : [ val ];

export const lagOffset = (lengde, liste) => {
    while (liste.length < lengde) {
        liste.push(liste[liste.length - 1]);
    }
    return liste;
};

export const zip = (liste1, liste2, namespace) => {
    return liste1.map((element, index) => {
        element[namespace] = liste2[index];
        return element;
    });
};
