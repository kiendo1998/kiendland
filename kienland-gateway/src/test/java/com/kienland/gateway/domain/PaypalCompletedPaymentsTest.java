package com.kienland.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.kienland.gateway.web.rest.TestUtil;

public class PaypalCompletedPaymentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaypalCompletedPayments.class);
        PaypalCompletedPayments paypalCompletedPayments1 = new PaypalCompletedPayments();
        paypalCompletedPayments1.setId(1L);
        PaypalCompletedPayments paypalCompletedPayments2 = new PaypalCompletedPayments();
        paypalCompletedPayments2.setId(paypalCompletedPayments1.getId());
        assertThat(paypalCompletedPayments1).isEqualTo(paypalCompletedPayments2);
        paypalCompletedPayments2.setId(2L);
        assertThat(paypalCompletedPayments1).isNotEqualTo(paypalCompletedPayments2);
        paypalCompletedPayments1.setId(null);
        assertThat(paypalCompletedPayments1).isNotEqualTo(paypalCompletedPayments2);
    }
}
