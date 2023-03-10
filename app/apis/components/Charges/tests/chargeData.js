export const chargeFeedData = {
  correlationId: '5e582ff0-d4bc-11eb-b236-55fb050c7981',
  charges: {
    object: 'list',
    data: [
      {
        id: 'ch_1J5lwBHnywB98SRr692f1lxy',
        object: 'charge',
        amount: 176000,
        application: null,
        application_fee: null,
        balance_transaction: 'txn_1J5lwCHnywB98SRrRYQ7gZVM',
        billing_details: {
          address: {
            postal_code: '42424',
          },
        },
        captured: true,
        created: 1624515679,
        currency: 'aud',
        customer: 'cus_JjEOpmgLOcKwnO',
        description: 'Subscription creation',
        destination: null,
        dispute: null,
        fraud_details: {},
        invoice: 'in_1J5lwBHnywB98SRrsn5ZiQKv',
        metadata: {},
        on_behalf_of: null,
        order: null,
        outcome: {
          network_status: 'approved_by_network',
          risk_level: 'normal',
          risk_score: 17,
          seller_message: 'Payment complete.',
          type: 'authorized',
        },
        paid: true,
        payment_intent: 'pi_1J5lwBHnywB98SRrZAlRMF76',
        payment_method: 'card_1J5lw9HnywB98SRr50NOmr1e',
        payment_method_details: {
          card: {
            brand: 'visa',
            checks: {
              address_postal_code_check: 'pass',
              cvc_check: 'pass',
            },
            country: 'US',
            exp_month: 4,
            exp_year: 2024,
            fingerprint: 'dsjwz73snQNZGnf8',
            funding: 'credit',
            last4: '4242',
          },
          type: 'card',
        },
        receipt_email: 'yuy0311+140520211@gmail.com',
        receipt_url:
          'https://pay.stripe.com/receipts/acct_1EaBj8HnywB98SRr/ch_1J5lwBHnywB98SRr692f1lxy/rcpt_JjEOJb2pWEAB589zAsBa2Yuls2PeJm3',
        refunds: {
          object: 'list',
          data: [],
          url: '/v1/charges/ch_1J5lwBHnywB98SRr692f1lxy/refunds',
        },
        review: null,
        source: {
          id: 'card_1J5lw9HnywB98SRr50NOmr1e',
          object: 'card',
          address_zip: '42424',
          address_zip_check: 'pass',
          brand: 'Visa',
          country: 'US',
          customer: 'cus_JjEOpmgLOcKwnO',
          cvc_check: 'pass',
          exp_month: 4,
          exp_year: 2024,
          fingerprint: 'dsjwz73snQNZGnf8',
          funding: 'credit',
          last4: '4242',
          metadata: {},
        },
        source_transfer: null,
        status: 'succeeded',
      },
    ],
    url: '/v1/charges',
  },
  timestamp: '2021-06-24T07:18:26.8105572Z',
};
