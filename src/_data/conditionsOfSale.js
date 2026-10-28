// Global data `conditionsOfSale`: the Terms and Conditions of Sale page (/conditions-of-sale/).
// The client's frame "Conditions of Sale" (Figma 35098:39725, 1600px, WIP page) draws the hero, the section bar and
// sections 1, 2 and 4.7 (with seven of the table's rows); its wording is used where it draws text. Everything else
// is word for word from amblersurgical.com/conditions-of-sale (effective September 11th, 2026), with the live
// page's anchors as ids, so links to its sections keep working.
//
// sections: [{ id, title (the section bar label), figma?, items: [subsection] }]
// subsection: { id, num, title, short? (the live table of contents' shorter title), figma?, blocks }
// blocks, in order:
//   { p }        paragraph (HTML: <strong>, links)
//   { h }        sub-heading inside a subsection
//   { note }     boxed notice (Figma "Disclaimer" 35098:39802)
//   { list }     bullet list (HTML items)
//   { ordered }  numbered list (HTML items)
//   { table: { head, rows, filter? } }  table; filter adds the "Search product lines" field (Figma 35098:39836)
//   { footnote, p }  footnote under a table ("*" / "**" marks in its rows)

export default {
  /** Hero (35098:39773): the frame's title and intro (the live page's two intro paragraphs as one). */
  title: "Terms and Conditions",
  intro:
    'These Terms and Conditions of Sale ("Terms") govern all quotations, orders, sales, shipments, products, and services provided by Ambler Surgical, LLC ("Ambler") to the purchaser ("Buyer"), unless Ambler expressly agrees otherwise in a written agreement signed by an authorized officer of Ambler. By submitting an order, accepting delivery of products, or otherwise purchasing products or services from Ambler, Buyer acknowledges and agrees to these Terms.',
  effective: "September 11th, 2026",
  sections: [
    {
      id: "ordering-pricing",
      title: "Orders & Pricing",
      figma: "35098:39793",
      items: [
        {
          id: "orders", num: "1.1", title: "Orders & Acceptance", figma: "35098:39797",
          blocks: [
            { p: "All orders are subject to acceptance by Ambler Surgical." },
            { p: "An order submitted through Ambler's website, by purchase order, telephone, email, EDI, electronic procurement system, or any other method constitutes an offer by Buyer to purchase the identified products subject to these Terms." },
            { p: "No order is binding upon Ambler until accepted by Ambler through shipment of the products, written order confirmation, or other affirmative acceptance." },
            { p: "Ambler reserves the right, in its discretion, to:" },
            { list: [
              "Accept or reject any order;",
              "Limit quantities;",
              "Require prepayment or additional credit information;",
              "Correct pricing, typographical, catalog, website, or other errors;",
              "Cancel an order affected by an error, product discontinuation, regulatory restriction, supplier issue, or product unavailability; and",
              "Offer a successor or functionally equivalent product, subject to Buyer's approval where appropriate.",
            ] },
            { p: "If an incorrect price is displayed or quoted, Ambler will notify Buyer of the corrected price before processing the affected order whenever reasonably practicable." },
          ],
        },
        {
          id: "purchase-orders", num: "1.2", title: "Buyer Purchase Orders and Conflicting Terms", short: "Buyer POs & Conflicting Terms", figma: "35098:39800",
          blocks: [
            { note: "AMBLER'S ACCEPTANCE OF ANY PURCHASE ORDER IS EXPRESSLY CONDITIONED UPON BUYER'S AGREEMENT TO THESE TERMS." },
            { p: "Any additional, inconsistent, or different terms contained in a purchase order, procurement portal, vendor form, acknowledgment, confirmation, correspondence, or other document issued by Buyer are expressly rejected and shall not modify these Terms." },
            { p: "Ambler's fulfillment of an order, acceptance of payment, or failure to object separately to Buyer's terms shall not constitute acceptance of those terms." },
            { p: "No additional or different term shall bind Ambler unless specifically accepted in a written agreement signed by an authorized officer of Ambler." },
          ],
        },
        {
          id: "contract-precedence", num: "1.3", title: "Contract and Government Terms", short: "Contract & Government Terms", figma: "35098:39805",
          blocks: [
            { p: "If Ambler and Buyer are parties to a separate written agreement, group purchasing organization agreement, integrated delivery network agreement, distributor agreement, government contract, public procurement agreement, or other negotiated contract signed or otherwise formally accepted by Ambler, the terms of that agreement shall control to the extent they conflict with these Terms." },
            { p: "For sales to federal, state, or local government entities, public hospitals, government-operated healthcare facilities, or other public purchasers, any mandatory procurement terms, statutes, regulations, contract clauses, or other legal requirements that are required to apply to the transaction shall control over any conflicting provision of these Terms." },
            { p: "Except to the extent expressly superseded by such a contract or mandatory legal requirement, these Terms shall remain in effect and continue to govern the transaction." },
            { p: "Terms contained solely in Buyer's purchase order, procurement portal, invoice instructions, or other unilateral document shall not supersede these Terms unless Ambler has expressly agreed to those terms in writing or the terms are required by applicable law." },
          ],
        },
        {
          id: "product-information", num: "1.4", title: "Product Info & Changes", figma: "35098:39808",
          blocks: [
            { p: "Ambler makes commercially reasonable efforts to maintain accurate product descriptions, specifications, photographs, availability information, and pricing." },
            { p: "Product photographs and illustrations are representative and may not depict minor manufacturing, packaging, labeling, color, or design changes." },
            { p: "Manufacturers may modify product design, materials, specifications, packaging, catalog numbers, labeling, or availability without notice." },
            { p: "Ambler reserves the right to modify or discontinue products prior to shipment and shall have no obligation to make comparable changes to products previously sold." },
          ],
        },
        {
          id: "prices", num: "1.5", title: "Prices & Quotations", figma: "35098:39811",
          blocks: [
            { p: "Unless otherwise stated in writing:" },
            { list: [
              "Prices are stated in U.S. dollars;",
              "Prices do not include freight, shipping, taxes, duties, customs charges, insurance, special handling, or similar charges;",
              "Prices are subject to change prior to acceptance of an order; and",
              "Quotations are valid only for the period stated in the quotation.",
            ] },
            { p: "A quotation is an invitation for Buyer to submit an order and does not constitute an obligation by Ambler to sell until the resulting order is accepted." },
            { p: "Pricing errors may be corrected before shipment. Buyer will be given the opportunity to accept the corrected price or cancel the affected item." },
          ],
        },
      ],
    },
    {
      id: "payment-taxes",
      title: "Payment & Taxes",
      figma: "35098:39817",
      items: [
        {
          id: "payment", num: "2.1", title: "Payment Terms & Credit", figma: "35098:39821",
          blocks: [
            { p: "Accounts approved for credit are payable <strong>Net 30 days from the invoice date</strong>, unless Ambler has agreed to different payment terms in writing." },
            { p: "Customers without an approved line of credit must pay in full prior to shipment." },
            { p: "Ambler may accept payment by credit card, electronic payment, wire transfer, check, or other payment methods authorized by Ambler." },
            { p: "Buyer shall pay all invoices without set-off, deduction, charge-back, withholding, or counterclaim except as expressly authorized by Ambler in writing." },
            { h: "Past-Due Accounts" },
            { p: "Past-due balances may accrue a finance charge at the lesser of <strong>1.5% per month (18% annually)</strong> or the maximum rate permitted by applicable law." },
            { p: "Buyer shall reimburse Ambler for reasonable costs incurred in collecting overdue amounts, including collection agency fees, court costs, and reasonable attorneys' fees, to the extent permitted by law." },
            { p: "If Buyer has a past-due balance or Ambler reasonably determines that Buyer's financial condition or creditworthiness has deteriorated, Ambler may, without liability:" },
            { list: [
              "Suspend shipments;",
              "Cancel unfulfilled orders;",
              "Reduce or revoke Buyer's credit limit;",
              "Require payment of past-due balances;",
              "Require advance payment for future orders; or",
              "Require another form of payment security.",
            ] },
          ],
        },
        {
          id: "taxes", num: "2.2", title: "Taxes", figma: "35098:39824",
          blocks: [
            { p: "Buyer is responsible for all applicable sales, use, excise, value-added, customs, duties, and other taxes or governmental charges associated with the purchase, importation, possession, or use of the products." },
            { p: "Buyer claiming tax-exempt status must provide a valid exemption certificate or other documentation acceptable to Ambler before the transaction is processed as tax exempt." },
          ],
        },
      ],
    },
    {
      id: "shipping-delivery",
      title: "Shipping & Delivery",
      items: [
        {
          id: "shipping", num: "3.1", title: "Shipping & Delivery",
          blocks: [
            { p: "Unless otherwise agreed in writing, Ambler will select the carrier and method of shipment based upon Buyer's requested service level and availability." },
            { p: "Shipping and handling charges are prepaid by Ambler and added to Buyer's invoice unless otherwise agreed. Ambler does not generally permit third-party carrier billing." },
            { p: "Orders placed before applicable processing cutoffs are normally processed within Ambler's published handling period; however, processing and delivery dates are estimates only unless Ambler expressly guarantees a date in writing." },
            { p: "Carrier-published delivery times and service commitments are controlled by the applicable carrier and are not independent guarantees by Ambler." },
            { h: "Risk of Loss" },
            { p: "Unless otherwise expressly agreed in writing, <strong>risk of physical loss or damage to products remains with Ambler until delivery by the carrier to the delivery address specified by Buyer.</strong>" },
            { p: "Following confirmed delivery at the specified address, Buyer assumes responsibility for the products, including loss caused by theft, unauthorized removal, weather exposure, or insecure receiving locations." },
            { p: "Buyer is responsible for providing a secure and appropriate delivery location." },
            { h: "Partial Shipments" },
            { p: "Ambler may make partial shipments unless Buyer and Ambler have expressly agreed otherwise in writing. Each partial shipment may be separately invoiced and shall be payable according to the applicable payment terms." },
          ],
        },
        {
          id: "delays", num: "3.2", title: "Delivery Delays & Backorders",
          blocks: [
            { p: "Shipment and delivery dates are estimates based upon conditions existing when the estimate is provided." },
            { p: "Ambler shall not be liable for delays caused by circumstances beyond its reasonable control, including manufacturer or supplier delays." },
            { p: "Items not immediately available may be placed on backorder unless Buyer instructs Ambler otherwise. Ambler may ship available items separately from backordered items." },
          ],
        },
        {
          id: "force-majeure", num: "3.3", title: "Force Majeure",
          blocks: [
            { p: "Ambler shall not be liable for any delay, failure to perform, shortage, allocation, cancellation, or inability to supply products resulting directly or indirectly from circumstances beyond Ambler's reasonable control." },
            { p: "Such circumstances include, without limitation:" },
            { list: [
              "Acts of God;",
              "Fire, flood, severe weather, earthquake, or natural disaster;",
              "Epidemic, pandemic, or public-health emergency;",
              "War, terrorism, civil disturbance, or governmental action;",
              "Embargoes, sanctions, or import/export restrictions;",
              "Tariffs or changes in trade restrictions;",
              "Transportation or carrier disruption;",
              "Port closures or congestion;",
              "Labor disputes or strikes;",
              "Utility, telecommunications, or internet interruption;",
              "Cybersecurity incidents;",
              "Raw-material shortages;",
              "Manufacturing interruptions;",
              "Supplier or manufacturer failures;",
              "Product recalls or regulatory actions; and",
              "Other circumstances beyond Ambler's reasonable control.",
            ] },
            { p: "During a shortage, Ambler may allocate available inventory among customers, orders, and internal requirements in a manner Ambler considers commercially reasonable." },
          ],
        },
        {
          id: "inspection", num: "3.4", title: "Inspection & Shipping Damage",
          blocks: [
            { p: "Buyer shall inspect all shipments promptly upon receipt." },
            { p: "Visible carton damage or shortages should be noted on the carrier's delivery record at the time of delivery whenever reasonably possible." },
            { p: "Buyer must notify Ambler promptly of:" },
            { list: [
              "Visible shipping damage;",
              "Shipment shortages;",
              "Incorrect products; or",
              "Other readily apparent shipping discrepancies.",
            ] },
            { p: "Notice of visible shipping damage or shortages should be provided within <strong>two (2) business days after delivery</strong>." },
            { p: "Claims involving concealed shipping damage should be reported within <strong>five (5) business days after discovery</strong>, or sooner if required by the carrier." },
            { p: "Failure to provide timely notice may adversely affect Ambler's ability to pursue a carrier claim and may result in denial of a shipping-damage claim to the extent permitted by law." },
            { p: "Product defects and warranty claims are governed separately by the warranty provisions below and are not limited to the foregoing freight-claim periods." },
            { p: "Buyer shall retain the shipping carton, packaging materials, damaged merchandise, and related documentation until Ambler advises that they may be discarded." },
          ],
        },
      ],
    },
    {
      id: "cancellations-returns",
      title: "Cancellations & Returns",
      figma: "35098:39830",
      items: [
        {
          id: "cancellation", num: "4.1", title: "Order Cancellation",
          blocks: [
            { p: "Stock-item orders may be cancelled prior to shipment only with Ambler's approval. Cancellation may not be permitted once an order has entered fulfillment or been committed to a supplier." },
            { p: "The following generally may not be cancelled once manufacturing, procurement, customization, or supplier processing has begun:" },
            { list: [
              "Special-order products;",
              "Custom-manufactured products;",
              "Custom-etched products;",
              "Modified or configured products;",
              "Drop-ship products;",
              "Products ordered specifically for Buyer;",
              "Products subject to a manufacturer's no-cancellation policy; and",
              "Other products designated non-cancellable at the time of sale.",
            ] },
            { p: "Buyer shall be responsible for any manufacturer cancellation charge, restocking fee, nonrecoverable cost, or other expense incurred by Ambler as a result of an approved cancellation." },
          ],
        },
        {
          id: "rga", num: "4.2", title: "Return Goods Authorization (RGA)", short: "RGA",
          blocks: [
            { p: "No product may be returned without a Return Goods Authorization (\"RGA\") issued by Ambler." },
            { p: "To request an RGA, contact Ambler Surgical Customer Service at <a href=\"tel:+16102807361\" class=\"link font-bold\">610-280-7361</a>." },
            { p: "Issuance of an RGA does not constitute approval of a credit. All returned products are subject to inspection and evaluation by Ambler before credit, replacement, or other disposition is authorized." },
            { p: "RGA numbers must be clearly identified on or with the return shipment as instructed by Ambler." },
            { p: "Unauthorized returns may be refused and returned to Buyer at Buyer's expense." },
          ],
        },
        {
          id: "return-condition", num: "4.3", title: "Return Condition Requirements",
          blocks: [
            { p: "Except for an authorized warranty claim involving a defective product, returned merchandise must be:" },
            { list: [
              "Unused;",
              "Unaltered;",
              "Unsterilized;",
              "Undamaged;",
              "Unmarked;",
              "In resalable condition; and",
              "Returned with all original packaging, boxes, bags, labels, Instructions for Use, accessories, and components.",
            ] },
            { p: "Ambler may reduce or deny credit where returned merchandise or packaging is damaged, incomplete, altered, contaminated, improperly packaged, or otherwise unsuitable for resale." },
            { p: "Shipping, expedited freight, international freight, customs charges, processing fees, and similar charges are generally nonrefundable unless the return results from an error by Ambler." },
          ],
        },
        {
          id: "nonreturnable", num: "4.4", title: "Nonreturnable Products",
          blocks: [
            { p: "Unless Ambler expressly authorizes a return in writing, the following are nonreturnable:" },
            { list: [
              "Non-sterile instruments that have been sterilized;",
              "Sterile products whose packaging has been opened, damaged, or compromised;",
              "Products returned outside the applicable return period;",
              "Products removed from or missing original packaging;",
              "Distributed products with damaged boxes, labels, packaging, or seals;",
              "Custom-etched products;",
              "Custom-manufactured products;",
              "Products modified at Buyer's request;",
              "Special-order products;",
              "Drop-ship products designated nonreturnable;",
              "Personal protective equipment where designated nonreturnable;",
              "K-Wires;",
              "Steinmann Pins;",
              "Cerclage Wire;",
              "Distraction Screws;",
              "Gigli Saw Blades; and",
              "Any product designated nonreturnable before or at the time of sale.",
            ] },
            { p: "Other manufacturer-specific restrictions may apply as provided in Ambler's then-current return schedule." },
          ],
        },
        {
          id: "return-periods", num: "4.5", title: "Return Periods & Restocking Fees",
          blocks: [
            { p: "Unless a manufacturer-specific policy provides otherwise:" },
            { h: "Ambler Surgical Products" },
            {
              table: {
                head: ["Return Period", "Restocking Fee"],
                rows: [
                  ["0-30 days from invoice date", "0%"],
                  ["31-45 days from invoice date", "20%"],
                  ["46 days or more from invoice date", "Not Returnable"],
                ],
              },
            },
            { p: "Manufacturer and distributed-product return policies vary. The manufacturer-specific return schedule published by Ambler and in effect on the date of the applicable order is incorporated into these Terms." },
            { p: "Where a manufacturer's policy is more restrictive than Ambler's general policy, the manufacturer's policy controls." },
            { p: "Ambler may update manufacturer-specific return policies when manufacturers modify their policies." },
          ],
        },
        {
          id: "decontamination", num: "4.6", title: "Decontamination of Devices Returned for Defect Evaluation", short: "Decontamination",
          blocks: [
            { p: "Any reusable medical device that has been used, opened into a sterile field, contaminated, or exposed to blood, tissue, bodily fluids, microorganisms, hazardous substances, or other potentially infectious material and is being returned to Ambler for defect evaluation must be appropriately cleaned and decontaminated before shipment." },
            { p: "Cleaning, disinfection, and sterilization, where applicable, must be performed in accordance with:" },
            { list: [
              "The product manufacturer's validated Instructions for Use;",
              "The healthcare facility's applicable infection-control procedures; and",
              "Applicable law and regulatory requirements.",
            ] },
            { p: "Buyer shall <strong>not</strong> autoclave or otherwise sterilize a product when that method is inconsistent with the manufacturer's Instructions for Use." },
            { p: "Ambler may require a written decontamination certification before accepting a device for defect evaluation." },
            { p: "Ambler may refuse, quarantine, destroy, or return at Buyer's expense any device submitted for defect evaluation that Ambler reasonably believes presents a biological, chemical, sharps, or other safety hazard." },
          ],
        },
        {
          id: "manufacturer-returns", num: "4.7", title: "Manufacturer-Specific Return Policy", short: "Manufacturer Return Table", figma: "35098:39834",
          blocks: [
            { p: "Manufacturer-specific return periods, restocking fees, quantity restrictions, and special-order exclusions apply in addition to the general return requirements above." },
            {
              table: {
                head: ["Product line", "0-30 days", "31-45 days"],
                filter: true,
                rows: [
                  ["Ambler Surgical", "0%", "20%"],
                  ["Advanced Medical Designs **", "Not Returnable", "Not Returnable"],
                  ["Aspen Surgical **", "Not Returnable", "Not Returnable"],
                  ["Beaver-Visitec **", "Not Returnable", "Not Returnable"],
                  ["Bovie Medical", "0%", "20%"],
                  ["Branson Ultrasonics", "0%", "Not Returnable"],
                  ["Buxton Biomedical **", "Not Returnable", "Not Returnable"],
                  ["Duckworth & Kent *", "10%", "Not Returnable"],
                  ["Electro-Matic **", "Not Returnable", "Not Returnable"],
                  ["Ellman International", "0%", "Not Returnable"],
                  ["Elmed", "0%", "Not Returnable"],
                  ["Epsilon USA", "0%", "Not Returnable"],
                  ["Eye Shield Technology **", "Not Returnable", "Not Returnable"],
                  ["Geuder *", "20%", "Not Returnable"],
                  ["Gulden Ophthalmics", "0%", "Not Returnable"],
                  ["Hurricane Medical **", "Not Returnable", "Not Returnable"],
                  ["Impex Surgical", "0%", "Not Returnable"],
                  ["Iridex **", "Not Returnable", "Not Returnable"],
                  ["Lacrivera", "0%", "Not Returnable"],
                  ["Magnetool **", "Not Returnable", "Not Returnable"],
                  ["Marina Medical", "0%", "Not Returnable"],
                  ["Mastel Precision", "0%", "Not Returnable"],
                  ["Medin Trays", "20%", "40%"],
                  ["Micro-Scientific Industries **", "Not Returnable", "Not Returnable"],
                  ["Micro Surgical Technology", "20%", "Not Returnable"],
                  ["MicroVision", "0%", "Not Returnable"],
                  ["Mr. Phaco *", "10%", "Not Returnable"],
                  ["Ocular Instruments", "0%", "Not Returnable"],
                  ["Oculo-Plastik", "0%", "20%"],
                  ["Odyssey Medical", "0%", "Not Returnable"],
                  ["Ophtec **", "Not Returnable", "Not Returnable"],
                  ["Padgett/Miltex", "0%", "Not Returnable"],
                  ["Peregrine Surgical **", "Not Returnable", "Not Returnable"],
                  ["Polarware Trays", "20%", "Not Returnable"],
                  ["PST Trays", "0%", "20%"],
                  ["Riley Medical **", "Not Returnable", "Not Returnable"],
                  ["Rumex", "0%", "Not Returnable"],
                  ["Stephens Instruments", "0%", "Not Returnable"],
                  ["Sterimedix **", "Not Returnable", "Not Returnable"],
                  ["Surgistar", "0%", "25%"],
                  ["The Alger Company", "0%", "Not Returnable"],
                  ["The Lebanon Corp", "0%", "Not Returnable"],
                  ["Titan Surgical", "0%", "Not Returnable"],
                  ["Volk Optical", "15%", "Not Returnable"],
                  ["Wexler Surgical **", "Not Returnable", "Not Returnable"],
                ],
              },
            },
            { footnote: "*", p: "Orders for more than one (1) quantity are not returnable." },
            { footnote: "**", p: "Orders from these manufacturers are considered special order and are not returnable." },
            { p: "Where a manufacturer changes its return or restocking policy, Ambler reserves the right to apply the manufacturer policy applicable to the product at the time of the applicable order." },
          ],
        },
      ],
    },
    {
      id: "warranty-group",
      title: "Warranty",
      items: [
        {
          id: "warranty", num: "5.1", title: "Ambler Surgical Instrument Warranty", short: "Instrument Warranty",
          blocks: [
            { p: "Ambler Surgical-branded reusable surgical instruments are warranted as follows, unless a different written warranty applies to a specific product." },
            { h: "30-Day Evaluation Period" },
            { p: "For thirty (30) days from the invoice date, Buyer may evaluate eligible Ambler Surgical-branded reusable instruments for quality, style, fit, and craftsmanship." },
            { p: "Any return under this evaluation period remains subject to Ambler's return authorization requirements and the return-condition requirements stated in these Terms." },
            { h: "One-Year Rust Warranty" },
            { p: "Ambler Surgical-branded reusable instruments are warranted against rust caused by defects in material or workmanship for one (1) year from the invoice date." },
            { p: "This rust warranty does not apply to staining, discoloration, corrosion, pitting, surface damage, or other deterioration caused by improper cleaning, sterilization, water quality, chemicals, detergents, storage, handling, maintenance, or failure to follow the applicable Instructions for Use." },
            { h: "Defects in Material and Workmanship" },
            { p: "Ambler Surgical-branded reusable instruments are warranted to be free from defects in material and workmanship when used for their intended purpose and properly handled, cleaned, disinfected, sterilized, maintained, and stored in accordance with the applicable Instructions for Use." },
            { p: "A warranty claim is subject to inspection and evaluation by Ambler. Ambler may require photographs, lot or serial information, sterilization or reprocessing information, or return of the instrument before determining whether warranty coverage applies." },
            { p: "If Ambler determines that a product is covered by warranty, Ambler will, at its option:" },
            { list: [
              "Repair the instrument;",
              "Replace it with the same or a substantially equivalent instrument; or",
              "Issue an appropriate credit.",
            ] },
            { p: "Repair, replacement, or credit is Buyer's exclusive contractual remedy for a valid warranty claim, to the maximum extent permitted by applicable law." },
            { p: "This warranty does not cover custom-manufactured, custom-modified, or custom-etched instruments unless Ambler expressly agrees otherwise in writing." },
            { p: "Ambler's Free Lifetime Repair Program is a separate service program and does not extend, modify, or create any product warranty except as expressly stated in the terms of that program." },
          ],
        },
        {
          id: "lifetime-repair", num: "5.2", title: "Free Lifetime Repair Program",
          blocks: [
            { p: "Certain qualifying Ambler Surgical-branded ophthalmic instruments may be eligible for Ambler's Free Lifetime Repair Program." },
            { p: "The Free Lifetime Repair Program is a service program separate from Ambler's product warranties and is subject to its own eligibility requirements, limitations, exclusions, repair limits, shipping responsibilities, and other program terms." },
            { p: "Eligibility for the program does not mean that every Ambler Surgical instrument, repair, component, or type of damage is covered." },
            { p: "The complete and current terms of the Free Lifetime Repair Program are available at: <a href=\"/free-lifetime-repair/\" class=\"link\">Ambler Surgical Free Lifetime Repair Program</a>." },
            { p: "The terms of the Free Lifetime Repair Program in effect when a repair request is submitted will govern that repair request, except where otherwise required by a controlling written agreement or applicable law." },
          ],
        },
        {
          id: "warranty-exclusions", num: "5.3", title: "Warranty Exclusions",
          blocks: [
            { p: "Ambler's warranties do not apply to damage, deterioration, malfunction, corrosion, staining, breakage, or other conditions caused by:" },
            { list: [
              "Misuse or abuse;",
              "Use outside the product's intended purpose;",
              "Improper handling;",
              "Improper cleaning or decontamination;",
              "Improper sterilization;",
              "Use of incompatible chemicals or detergents;",
              "Improper water quality;",
              "Failure to follow the Instructions for Use;",
              "Improper storage;",
              "Unauthorized repair, sharpening, alteration, or modification;",
              "Normal wear and tear;",
              "Accident;",
              "Fire;",
              "Flood;",
              "Natural disaster;",
              "Improper maintenance; or",
              "Other causes not attributable to a defect in material or workmanship.",
            ] },
            { p: "Ambler may inspect and evaluate any product submitted for warranty consideration before determining whether warranty coverage applies." },
          ],
        },
        {
          id: "third-party", num: "5.4", title: "Third-Party Products",
          blocks: [
            { p: "Products manufactured by third parties are subject to the applicable manufacturer's warranty, if any." },
            { p: "To the maximum extent permitted by law, Ambler does not independently provide a warranty for third-party products beyond any warranty expressly stated by Ambler in writing." },
            { p: "Ambler may assist Buyer in submitting a valid manufacturer's warranty claim but does not guarantee the manufacturer's acceptance or resolution of such claim." },
          ],
        },
        {
          id: "warranty-disclaimer", num: "5.5", title: "Disclaimer of Implied Warranties",
          blocks: [
            { p: "<strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, EXCEPT FOR THE EXPRESS WARRANTIES SPECIFICALLY SET FORTH IN THESE TERMS OR OTHERWISE EXPRESSLY PROVIDED BY AMBLER IN WRITING, AMBLER DISCLAIMS ALL OTHER WARRANTIES, REPRESENTATIONS, CONDITIONS, AND GUARANTEES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTY OF MERCHANTABILITY AND ANY IMPLIED WARRANTY OF FITNESS FOR A PARTICULAR PURPOSE.</strong>" },
            { p: "No oral or written information, recommendation, product description, catalog statement, website content, or advice provided by an Ambler employee or representative shall create a warranty except where expressly set forth in a writing authorized by Ambler." },
          ],
        },
      ],
    },
    {
      id: "use-compliance",
      title: "Use, Compliance & Safety",
      items: [
        {
          id: "clinical-use", num: "6.1", title: "Product Selection & Clinical Use", short: "Clinical Use",
          blocks: [
            { p: "Buyer is responsible for determining whether a product is appropriate for Buyer's intended application." },
            { p: "Product information supplied by Ambler is intended to assist qualified purchasers and healthcare professionals but is not a substitute for professional clinical judgment, the manufacturer's Instructions for Use, applicable standards of care, or facility policies." },
            { p: "Ambler does not provide medical advice." },
            { p: "Healthcare professionals are responsible for selecting, inspecting, preparing, using, reprocessing, and maintaining medical devices in accordance with their professional judgment and applicable Instructions for Use." },
          ],
        },
        {
          id: "regulatory", num: "6.2", title: "Regulatory Compliance & Eligibility to Purchase", short: "Regulatory Compliance",
          blocks: [
            { p: "Certain products sold by Ambler are regulated by the U.S. Food and Drug Administration and may also be subject to federal, state, local, or international restrictions concerning sale, distribution, possession, or use." },
            { p: "Buyer represents and warrants that:" },
            { ordered: [
              "Buyer is legally authorized to purchase, receive, possess, distribute, and use the products ordered;",
              "Buyer possesses all licenses, registrations, certifications, prescriptions, authorizations, or other credentials required by applicable law;",
              "Buyer will use and distribute products only in compliance with applicable laws and regulations; and",
              "Buyer will not purchase products for an unlawful, unauthorized, or prohibited purpose.",
            ] },
            { p: "Where applicable law restricts a device to sale by or on the order of a licensed healthcare practitioner, Buyer represents that the applicable requirements have been satisfied." },
            { p: "Ambler may request reasonable documentation to verify Buyer's identity, facility, professional status, resale status, National Provider Identifier (NPI), licensure, or other eligibility." },
            { p: "Failure to provide satisfactory information may result in delay, refusal, or cancellation of an order." },
          ],
        },
        {
          id: "recalls", num: "6.3", title: "Recalls & Safety Notices",
          blocks: [
            { p: "Buyer agrees to reasonably cooperate with Ambler regarding manufacturer safety notices, field corrections, withdrawals, and product recalls." },
            { p: "Where reasonably necessary for regulatory or safety purposes, Buyer shall maintain sufficient records to identify the location or disposition of affected products." },
            { p: "Buyer shall promptly cease use, quarantine, return, destroy, or otherwise handle affected products when instructed pursuant to an applicable recall or safety notice." },
          ],
        },
        {
          id: "resale", num: "6.4", title: "Resale & Distribution",
          blocks: [
            { p: "Buyers purchasing products for resale are responsible for complying with all applicable laws governing storage, handling, distribution, traceability, labeling, export, and resale." },
            { p: "Buyer shall not relabel, repackage, modify, alter, remove identifying information from, or make unauthorized representations concerning a regulated product in violation of applicable law." },
          ],
        },
        {
          id: "international", num: "6.5", title: "International Orders",
          blocks: [
            { p: "International orders are subject to Ambler's approval and generally require payment in full before shipment." },
            { p: "International orders may be subject to:" },
            { list: [
              "Shipping charges;",
              "Customs duties;",
              "Brokerage charges;",
              "Import taxes;",
              "Value-added taxes;",
              "Regulatory fees;",
              "Wire-transfer fees;",
              "International processing fees; and",
              "Other governmental or carrier charges.",
            ] },
            { p: "Unless Ambler expressly agrees otherwise in writing, Buyer is responsible for complying with all laws governing the importation, registration, licensing, possession, and use of products in the destination country." },
            { p: "Buyer shall provide all information and documentation reasonably required for export and customs processing." },
            { p: "Ambler may decline to ship products to any country, party, or destination where shipment would violate or potentially violate applicable export controls, sanctions, product registrations, or other legal requirements." },
            { p: "International delivery estimates are not guaranteed." },
          ],
        },
      ],
    },
    {
      id: "legal-dispute",
      title: "Legal & Dispute Terms",
      items: [
        {
          id: "liability", num: "7.1", title: "Limitation of Liability",
          blocks: [
            { p: "To the maximum extent permitted by applicable law, in no event shall Ambler be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of profits, revenue, business, use, data, production, goodwill, or opportunity, business interruption, delay costs, or costs of substitute products or services, arising out of or relating to any product, service, order, or transaction, regardless of the theory of liability and even if Ambler has been advised of the possibility of such damages." },
            { p: "<strong>To the maximum extent permitted by law, Ambler's aggregate liability arising out of or relating to any particular product, order, or transaction shall not exceed the amount actually paid to Ambler for the specific product or service giving rise to the claim.</strong>" },
            { p: "The foregoing limitations shall apply to the fullest extent permitted by applicable law." },
            { p: "Nothing in these Terms is intended to exclude or limit liability that cannot lawfully be excluded or limited." },
          ],
        },
        {
          id: "governing-law", num: "7.2", title: "Governing Law",
          blocks: [
            { p: "These Terms and all sales and transactions between Ambler and Buyer shall be governed by and construed in accordance with the laws of the <strong>Commonwealth of Pennsylvania</strong>, without regard to conflict-of-law rules that would require application of another jurisdiction's laws." },
            { p: "The United Nations Convention on Contracts for the International Sale of Goods (CISG) shall not apply." },
            { p: "This section is subject to any controlling terms of a separate contract or mandatory government procurement requirement described in Section 1.3." },
          ],
        },
        {
          id: "venue", num: "7.3", title: "Jurisdiction & Venue",
          blocks: [
            { p: "To the maximum extent permitted by law, any lawsuit, action, or proceeding arising from or relating to these Terms or any transaction between Ambler and Buyer shall be brought exclusively in a state court of competent jurisdiction located in <strong>Chester County, Pennsylvania</strong>, or the applicable United States federal court having jurisdiction over Chester County, Pennsylvania." },
            { p: "Buyer irrevocably submits to the personal jurisdiction of those courts and waives any objection based upon venue or inconvenient forum." },
            { p: "This section does not override a different forum or venue requirement contained in a controlling written contract or imposed by mandatory law." },
          ],
        },
        {
          id: "collection", num: "7.4", title: "Attorneys' Fees for Collection", short: "Attorneys' Fees",
          blocks: [
            { p: "In addition to other remedies available to Ambler, Buyer shall reimburse Ambler for reasonable attorneys' fees, court costs, collection fees, and other reasonable expenses incurred in collecting undisputed past-due amounts or enforcing Ambler's payment rights, to the extent permitted by applicable law." },
          ],
        },
        {
          id: "waiver", num: "7.5", title: "No Waiver",
          blocks: [
            { p: "Ambler's failure or delay in exercising any right or remedy shall not operate as a waiver of that right or remedy." },
            { p: "A waiver relating to one transaction, breach, or occurrence shall not constitute a waiver relating to any other transaction, breach, or occurrence." },
          ],
        },
        {
          id: "severability", num: "7.6", title: "Severability",
          blocks: [
            { p: "If any provision of these Terms is determined to be invalid, illegal, or unenforceable, that provision shall be enforced to the maximum extent permitted by law and the remaining provisions shall remain in full force and effect." },
          ],
        },
        {
          id: "assignment", num: "7.7", title: "Assignment",
          blocks: [
            { p: "Buyer may not assign or transfer an order, agreement, or any rights or obligations arising from a transaction with Ambler without Ambler's prior written consent." },
            { p: "Ambler may assign its rights and obligations in connection with a merger, acquisition, reorganization, sale of assets, financing transaction, or transfer to an affiliate or successor." },
          ],
        },
        {
          id: "entire-agreement", num: "7.8", title: "Entire Agreement & Modification", short: "Entire Agreement",
          blocks: [
            { p: "Except where a separate written agreement, government contract, public procurement agreement, or other controlling agreement described in Section 1.3 applies, these Terms, together with Ambler's applicable quotation, order confirmation, invoice, and product-specific terms, constitute the agreement between Ambler and Buyer concerning the applicable transaction." },
            { p: "Where a separate agreement described in Section 1.3 applies, that agreement shall control to the extent of any conflict, and these Terms shall continue to apply to matters not addressed or superseded by that agreement." },
            { p: "Except as provided in Section 1.3, these Terms supersede conflicting terms contained in any Buyer document unless Ambler has expressly agreed to such terms in a writing signed by an authorized officer." },
            { p: "No oral statement, course of dealing, past practice, or other communication shall modify these Terms." },
            { p: "Ambler may update these Terms periodically. The version in effect when Ambler accepts an order will govern that transaction unless otherwise agreed in writing." },
          ],
        },
        {
          id: "electronic", num: "7.9", title: "Electronic Transactions",
          blocks: [
            { p: "Buyer agrees that orders, confirmations, invoices, notices, acceptances, and other transaction records may be transmitted and maintained electronically." },
            { p: "Electronic acceptance, electronic submission of an order, and electronic records shall have the same effect as their paper counterparts to the extent permitted by applicable law." },
          ],
        },
        {
          id: "survival", num: "7.10", title: "Survival",
          blocks: [
            { p: "Provisions concerning payment obligations, warranties and warranty exclusions, limitation of liability, regulatory obligations, governing law, venue, collections, and other provisions that by their nature should survive shall survive completion, cancellation, or termination of a transaction." },
          ],
        },
      ],
    },
  ],
  /** "Questions About These Terms?" box closing the live page. */
  contact: {
    title: "Questions About These Terms?",
    company: "Ambler Surgical, LLC",
    address: ["436 Creamery Way, Suite 300", "Exton, PA 19341"],
    phones: [
      { label: "Customer Service", number: "610-280-7361", href: "tel:+16102807361" },
      { label: "Toll Free", number: "1-888-407-0006", href: "tel:+18884070006" },
    ],
    text: "Questions regarding orders, returns, warranties, or these Terms should be directed to Ambler Surgical Customer Service.",
  },
};
