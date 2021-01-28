export const arr = (val: any) => (Array.isArray(val) ? val : [val]);

export const lagOffset = (lengde: number, liste: any[]) => {
    while (liste.length < lengde) {
        liste.push(liste[liste.length - 1]);
    }
    return liste;
};

export const zip = (liste1: any[], liste2: any[], namespace: string) => {
    return liste1.map((element, index) => {
        element[namespace] = liste2[index];
        return element;
    });
};
