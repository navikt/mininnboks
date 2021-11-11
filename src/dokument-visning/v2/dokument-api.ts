export const urls = {
    journalposter: () =>`/mininnboks-api/dokument`,
    journalpost:  (journalpostId: string) =>`/mininnboks-api/dokument/${journalpostId}`,
    dokument:  (journalpostId: string, dokumentId: string) =>`/mininnboks-api/dokument/${journalpostId}/${dokumentId}`
}