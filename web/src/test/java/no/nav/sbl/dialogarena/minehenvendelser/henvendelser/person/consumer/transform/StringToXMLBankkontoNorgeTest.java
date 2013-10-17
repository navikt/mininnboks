package no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.transform;

import org.junit.Test;

import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.transform.Transform.toXMLBankkontoNorge;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class StringToXMLBankkontoNorgeTest {
    @Test
    public void testTransform() throws Exception {
        String kontonummer = "***REMOVED***1";
        StringToXMLBankkontoNorge transformer = (StringToXMLBankkontoNorge) toXMLBankkontoNorge();
        assertThat(transformer.transform(kontonummer).getBankkonto().getBankkontonummer(), is(equalTo(kontonummer)));
    }
}