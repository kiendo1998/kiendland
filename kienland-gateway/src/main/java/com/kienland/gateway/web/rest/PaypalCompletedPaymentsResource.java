package com.kienland.gateway.web.rest;

import com.kienland.gateway.domain.PaypalCompletedPayments;
import com.kienland.gateway.repository.PaypalCompletedPaymentsRepository;
import com.kienland.gateway.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.kienland.gateway.domain.PaypalCompletedPayments}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaypalCompletedPaymentsResource {

    private final Logger log = LoggerFactory.getLogger(PaypalCompletedPaymentsResource.class);

    private static final String ENTITY_NAME = "paypalCompletedPayments";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaypalCompletedPaymentsRepository paypalCompletedPaymentsRepository;

    public PaypalCompletedPaymentsResource(PaypalCompletedPaymentsRepository paypalCompletedPaymentsRepository) {
        this.paypalCompletedPaymentsRepository = paypalCompletedPaymentsRepository;
    }

    /**
     * {@code POST  /paypal-completed-payments} : Create a new paypalCompletedPayments.
     *
     * @param paypalCompletedPayments the paypalCompletedPayments to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paypalCompletedPayments, or with status {@code 400 (Bad Request)} if the paypalCompletedPayments has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paypal-completed-payments")
    public ResponseEntity<PaypalCompletedPayments> createPaypalCompletedPayments(@Valid @RequestBody PaypalCompletedPayments paypalCompletedPayments) throws URISyntaxException {
        log.debug("REST request to save PaypalCompletedPayments : {}", paypalCompletedPayments);
        if (paypalCompletedPayments.getId() != null) {
            throw new BadRequestAlertException("A new paypalCompletedPayments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaypalCompletedPayments result = paypalCompletedPaymentsRepository.save(paypalCompletedPayments);
        return ResponseEntity.created(new URI("/api/paypal-completed-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paypal-completed-payments} : Updates an existing paypalCompletedPayments.
     *
     * @param paypalCompletedPayments the paypalCompletedPayments to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paypalCompletedPayments,
     * or with status {@code 400 (Bad Request)} if the paypalCompletedPayments is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paypalCompletedPayments couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paypal-completed-payments")
    public ResponseEntity<PaypalCompletedPayments> updatePaypalCompletedPayments(@Valid @RequestBody PaypalCompletedPayments paypalCompletedPayments) throws URISyntaxException {
        log.debug("REST request to update PaypalCompletedPayments : {}", paypalCompletedPayments);
        if (paypalCompletedPayments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaypalCompletedPayments result = paypalCompletedPaymentsRepository.save(paypalCompletedPayments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, paypalCompletedPayments.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /paypal-completed-payments} : get all the paypalCompletedPayments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paypalCompletedPayments in body.
     */
    @GetMapping("/paypal-completed-payments")
    public List<PaypalCompletedPayments> getAllPaypalCompletedPayments() {
        log.debug("REST request to get all PaypalCompletedPayments");
        return paypalCompletedPaymentsRepository.findAll();
    }

    /**
     * {@code GET  /paypal-completed-payments/:id} : get the "id" paypalCompletedPayments.
     *
     * @param id the id of the paypalCompletedPayments to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paypalCompletedPayments, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paypal-completed-payments/{id}")
    public ResponseEntity<PaypalCompletedPayments> getPaypalCompletedPayments(@PathVariable Long id) {
        log.debug("REST request to get PaypalCompletedPayments : {}", id);
        Optional<PaypalCompletedPayments> paypalCompletedPayments = paypalCompletedPaymentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paypalCompletedPayments);
    }

    /**
     * {@code DELETE  /paypal-completed-payments/:id} : delete the "id" paypalCompletedPayments.
     *
     * @param id the id of the paypalCompletedPayments to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paypal-completed-payments/{id}")
    public ResponseEntity<Void> deletePaypalCompletedPayments(@PathVariable Long id) {
        log.debug("REST request to delete PaypalCompletedPayments : {}", id);
        paypalCompletedPaymentsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
