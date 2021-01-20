package com.kienland.gateway.repository;

import com.kienland.gateway.domain.PaypalCompletedPayments;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PaypalCompletedPayments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaypalCompletedPaymentsRepository extends JpaRepository<PaypalCompletedPayments, Long> {

    @Query("select paypalCompletedPayments from PaypalCompletedPayments paypalCompletedPayments where paypalCompletedPayments.user.login = ?#{principal.username}")
    List<PaypalCompletedPayments> findByUserIsCurrentUser();
}
