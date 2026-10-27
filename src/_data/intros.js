/**
 * Short SEO intros (2-4 lines under the hero title) for the pages Figma draws without copy.
 * Condensed from the category and meta descriptions on amblersurgical.com (October 2026);
 * no product counts, since the prototype's listings hold only a sample of the catalog.
 * Used by plp.js for the listing heroes and by the index pages (global `intros`).
 */

/** Browse by Type pages: [what we carry, what it does]. Specialty pages reuse the second sentence. */
const types = {
  adenotomes: [
    "Shop adenotomes for adenoidectomy, including Shambaugh adenotomes in medium and large sizes and LaForce/Shambaugh replacement blades.",
    "Guarded cutting edges remove adenoid tissue in one controlled pass.",
  ],
  "alcohol-wells": [
    "Choose Camellin style LASIK alcohol wells or the Hyver PRK/LASEK alcohol well with a 7.5mm x 8.5mm oval diameter.",
    "They hold dilute alcohol on the epithelium in a defined zone, so it loosens evenly without spreading.",
  ],
  "bending-tools": [
    "Shop bending tools for wires, pins, rods and plates, including wire bending irons, wire and pin benders, seven step wire benders and rod benders.",
    "Contoured jaws and long levers shape implants precisely without nicking the metal.",
  ],
  "blade-holders": [
    "Find Castroviejo, Barraquer and Swiss blade breakers and holders, plus stainless steel blades in boxes of 10 and 50.",
    "They hold a snapped razor blade fragment firmly for fine, controlled incisions.",
  ],
  blades: [
    "Shop stainless steel surgical blades in #10, #11, #12, #15, #15C and #22 sizes for the OR and the clinic.",
    "Each fits a standard knife handle and keeps a sharp, consistent edge from the first cut to the last.",
  ],
  calipers: [
    "Shop surgical calipers for measuring in the field, including Stahl corneal calipers and Braunstein fixed calipers.",
    "Fine, clearly marked tips give accurate readings for incisions, flaps and markings.",
  ],
  cannulas: [
    "Find angled viscoelastic, hydrodissection, irrigating and aspirating cannulas in 27 and 30 gauge, among many other patterns.",
    "Polished tips and secure hubs deliver targeted flow with gentle tissue contact.",
  ],
  "capsule-polishers": [
    "Shop Shepard, Younger 360º, Rumex, Cionni-Singer and Singer sweep capsule polishers and Hu polishing curettes.",
    "Finely textured tips clean residual lens epithelial cells from the capsule without tearing it.",
  ],
  chisels: [
    "Shop surgical chisels, including Lexer chisels and Cottle septum chisels with graduation lines, in several widths.",
    "Sharp, hardened edges shape and remove bone and cartilage with controlled mallet strikes.",
  ],
  choppers: [
    "Find phaco and nucleus choppers, including Rosen, Nagahara, He and Rajendra Prasad choppers and the Sung reverse nucleus chopper.",
    "Balanced tips split and segment the nucleus while protecting the posterior capsule.",
  ],
  clamps: [
    "Shop Cooley, DeBakey, Glover and Kartchner vascular clamps, Cooley and DeBakey bulldog clamps and Lowman bone clamps.",
    "Atraumatic and serrated jaws hold vessels and tissue securely, with ratchets that release cleanly.",
  ],
  curettes: [
    "Choose from Scoville ruptured disc, spinal fusion, antrum, Sims uterine and Barnhill adenoid curettes, among many other patterns.",
    "Sharp or blunt cups scrape and remove tissue precisely, in straight, angled and reverse styles.",
  ],
  cutters: [
    "Shop wire cutters, pin cutters, bolt and pin cutters, K-wire cutters, cable cutters and a finger ring cutter.",
    "Hardened jaws and compound leverage cut cleanly through wire and pins with less hand effort.",
  ],
  "cutting-blocks": [
    "Find House cutting blocks, a Southern Eye Bank of New Orleans teflon block and Iowa P.K. press punch blocks.",
    "They give a firm, flat base for trimming grafts and tissue to size.",
  ],
  depressors: [
    "Shop Wieder, Andrews, Tobold and Bosworth tongue depressors and Schepens and Schocket scleral depressors.",
    "Smooth blades and tips hold tissue aside or indent it gently for a clear view.",
  ],
  dilators: [
    "Find Bakes common bile duct dilators, DeBakey vascular dilators, Sarns-style dilators and Hank uterine dilators.",
    "Graduated, polished tips open ducts, vessels and canals gradually and atraumatically.",
  ],
  dissectors: [
    "Shop Olivecrona, MacDonald, Blumenthal, Lemmon and Pierse dissectors and R-Style spatula, micro and ball dissectors.",
    "Fine, balanced tips separate tissue planes bluntly with good tactile feedback.",
  ],
  distractors: [
    "Find Caspar distractors for a left or right side approach, bone and vertebra distractors and MIS distractors.",
    "They hold bone segments or vertebrae apart steadily, giving room to work.",
  ],
  "drill-bits": [
    "Shop Jacobs chuck drill bits from 1.0mm to 6.0mm diameter and quick coupling drill bits from 1.1mm to 4.5mm diameter.",
    "Sharp, fluted tips drill clean pilot holes in bone for screws and pins.",
  ],
  "ear-loops": [
    "Shop ear loops, including Billeau ear loops, for removing cerumen and foreign bodies from the ear canal.",
    "Smooth wire loops on slim handles reach the canal gently with a clear line of sight.",
  ],
  electrodes: [
    "Find insulated needle electrodes, fine wire needle electrodes and round and diamond loop electrodes for radiofrequency surgery.",
    "They give precise cutting and coagulation in clinic and OR settings.",
  ],
  "electrodes-and-coagulators": [
    "Shop electrodes and coagulators for electrosurgery, from needle and loop electrodes to bipolar coagulation tips.",
    "They deliver precise cutting and clean hemostasis in clinic and OR settings.",
  ],
  elevators: [
    "Shop Cobb spinal, Freer and Cottle septum, Carroll and Dingman periosteal and Boies nasal fracture elevators.",
    "Sharp or blunt blades lift periosteum and separate tissue cleanly.",
  ],
  expressors: [
    "Find expressors, including the Flora expressor and Livengood expressor paddles.",
    "Smooth, rounded paddles apply gentle, even pressure exactly where it is needed.",
  ],
  "fixation-plates": [
    "Shop fixation plates, including Josephberg trocar fixation plates and Eckardt pressure plates.",
    "They stabilize the globe and steady instruments during vitreoretinal steps.",
  ],
  "fixation-rings": [
    "Find Fine-Thornton swivel fixation rings, Flieringa fixation ring sets and Mastel Olson, Thornton and Fine-Thornton rings.",
    "They hold the globe steady for incisions, markings and refractive procedures.",
  ],
  "flap-smoothers": [
    "Shop the Ambler LASIK/DSAEK roller, the Carlson DSEK smoother and the Caro flap repositioning manipulator.",
    "Smooth, gentle surfaces reposition flaps and grafts and clear folds and interface fluid.",
  ],
  forceps: [
    "Browse hemostatic, tissue, grasping, obstetrical and ENT forceps by type or name, from DeBakey and Adson to Castroviejo.",
    "Precisely aligned jaws grasp and hold tissue, vessels and sutures securely.",
  ],
  gags: [
    "Shop mouth gags that hold the mouth open securely for tonsillectomy, adenoidectomy and oral surgery.",
    "Ratchet frames and tongue blades keep the airway clear and the field open.",
  ],
  gauges: [
    "Find Mastel Gimbel-Mendez, Osher-Nichamin and Cionni degree gauges, Mendez degree gauges and depth gauges.",
    "Clear, accurate markings help align toric lenses, incisions and implants.",
  ],
  goniometers: [
    "Shop goniometers, including the Polk finger goniometer and the Moeltgen goniometer.",
    "They measure joint angles and range of motion before and after hand surgery.",
  ],
  gouges: [
    "Find Stille-type gouges, Alexander and Bishop mastoid gouges, tendon gouges and bone gouges.",
    "Curved, sharp blades scoop and shape bone with controlled mallet strikes.",
  ],
  "hand-fixation": [
    "Shop hand fixation devices, including lead hands and aluminum orthopedic hands that hold the hand in position.",
    "They keep fingers stable and out of the way during hand and wrist surgery.",
  ],
  handpieces: [
    "Find irrigation, aspiration and infusion handpieces, including McIntyre, Kansas and Charles flute handpieces, backflush handpieces and I/A tips.",
    "They connect cannulas and tips for controlled flow in anterior and posterior segment surgery.",
  ],
  hooks: [
    "Shop Jameson and Helveston muscle hooks, Von Graefe strabismus hooks, Cottle skin hooks and Adson and Cushing nerve hooks.",
    "Sharp or blunt tips retract, lift and position tissue with minimal trauma.",
  ],
  impactors: [
    "Find Cloward-style bone graft impactors, Caspar bone graft holder/impactors and bone impactors.",
    "Flat, stable tips seat grafts and implants firmly with controlled mallet strikes.",
  ],
  injectors: [
    "Shop capsular tension ring injectors, Ambler II and III cartridge injectors and pupil dilator ring injectors.",
    "Smooth plunger action delivers rings and lenses through small incisions with control.",
  ],
  "k-wires": [
    "Shop K-wires in double trocar and double diamond point styles, in a range of diameters and lengths.",
    "They give temporary and definitive fixation of small bone fragments.",
  ],
  "knife-handles": [
    "Find #3, #3LA, #4L and #7 knife handles and Barron, Beaver, Hardy, Kaye and Siegel knife handles.",
    "Balanced, knurled grips hold blades securely for precise, controlled cuts.",
  ],
  knives: [
    "Shop Tooke corneal knives, Cottle nasal knives, Fisher tonsil knives, Guilford-Wright flap knives and House myringotomy blades.",
    "Precisely ground edges make clean incisions in delicate tissue.",
  ],
  "laser-instruments": [
    "Shop laser instruments for refractive and retinal procedures, from LASIK flap tools to laser probes and shields.",
    "Non-reflective finishes and fine tips help you work safely around the beam.",
  ],
  "lens-loops": [
    "Find Lewis, Wilder, Gills-Welsh, Simcoe, Kirby, Arlt and Snellen lens loops.",
    "Smooth, curved loops support and lift the lens nucleus during extraction.",
  ],
  "lid-plates": [
    "Shop Jaeger, Berke-Jaeger and Aestek® Jaeger lid plates and the D&K Otaka lid plate.",
    "They protect the globe and support the eyelid during lid and oculoplastic surgery.",
  ],
  "ligature-carriers": [
    "Find Deschamps, Brunner and Bankart ligature carriers.",
    "Curved, eyed tips pass ligatures safely around vessels and deep structures.",
  ],
  "light-cords": [
    "Shop fiber optic light cords that carry light from the source to headlights, scopes and lighted retractors.",
    "They give bright, even illumination deep in the surgical field.",
  ],
  loops: [
    "Find surgical loops, including Billeau ear loops and Mills endarterectomy loops.",
    "Smooth wire loops lift, clear and remove material with gentle, controlled contact.",
  ],
  mallets: [
    "Shop Gerzog, Mead, Ombredanne, Bergman and Cottle mallets, bone mallets and replacement nylon heads.",
    "Weighted, balanced heads deliver controlled strikes to chisels, osteotomes and gouges.",
  ],
  manipulators: [
    "Find Sinskey and Lester IOL manipulators, O'Gawa lens dialers, Osher/Malyugin ring manipulators and Drysdale nucleus manipulators.",
    "Fine, polished tips position tissue, lenses and implants precisely through small incisions.",
  ],
  markers: [
    "Shop Mastel toric and optic zone markers, Hoffer optic zone markers, Dell LRI astigmatism markers and Freeman areola markers.",
    "Clear, crisp marks guide incisions, toric alignment and skin landmarks.",
  ],
  mirrors: [
    "Find House middle ear mirrors, laryngeal mirrors, Hardy mirrors and mouth mirrors, plus mirror handles.",
    "Polished faces give a clear, indirect view of hard-to-see areas.",
  ],
  miscellaneous: [
    "Specialty items that don't fit one category, from Paine carpal tunnel retinaculotomes and Wright fascia needles to Amsler grid books.",
    "Browse them here, or cross-reference a catalog number to find the exact item.",
  ],
  "needle-holders": [
    "Shop Castroviejo, Barraquer, Crile-Wood and DeBakey vascular needle holders and D&K micro needle holders.",
    "Precise, low-play jaws hold the needle steady for controlled suturing.",
  ],
  needles: [
    "Find Hough, House, Jordan and Schuknecht ear needles, Kleinsasser laryngeal needles and septum and tonsil needles.",
    "Fine, sharp points for injection, puncture and delicate work.",
  ],
  osteotomes: [
    "Shop Cinelli, Cobb, Converse, Cottle, Hibbs, Hoke and Lambotte osteotomes.",
    "Sharp, beveled blades cut and shape bone precisely under mallet control.",
  ],
  picks: [
    "Find Austin, House, Rosen, Bellucci and Guilford-Wright picks and House oval window and strut picks.",
    "Fine, angled tips for precise work in tight spaces.",
  ],
  pliers: [
    "Shop flat nose, needle nose and locking pliers, pin pulling pliers and flat nose K-wire pliers.",
    "Strong, hardened jaws grip, bend and pull wires and pins securely.",
  ],
  probes: [
    "Find Bowman lacrimal probes, Worst pigtail probes, Bunnell dissecting probes and Skillern sinus probes.",
    "Smooth, malleable tips explore and dilate canals, ducts and sinuses gently.",
  ],
  punches: [
    "Shop Keyes dermal punches, Castroviejo and Gass corneoscleral punches, D&K Khaw descemet membrane punches and Karp aortic punches.",
    "Precisely matched cutting edges remove clean, round tissue sections.",
  ],
  raspatories: [
    "Find Semb, Lambotte, Farabeuf and Kirmission periosteal raspatories and Joseph septum raspatories.",
    "Sharp edges strip periosteum and tissue cleanly from bone.",
  ],
  rasps: [
    "Shop Miller, Cottle, Fomon, Maltz and Putti rasps, Doyen rib rasps and bone files.",
    "Fine, sharp teeth smooth and shape bone and cartilage with control.",
  ],
  retractors: [
    "Shop hand-held and self-retaining retractors, from skin and lid retractors to Cloward retractors and Cooley sternal retractors.",
    "They hold tissue and wound edges back steadily for a clear, open field.",
  ],
  rongeurs: [
    "Find Kerrison, Leksell, Adson, Beyer, Lempert, Luer and Friedman micro rongeurs.",
    "Sharp, cupped jaws bite and remove bone and tough tissue in controlled pieces.",
  ],
  rotators: [
    "Shop Bechert, Tennant, Maloney and Clayman nucleus rotators and the D&K Hirschman IOL rotator.",
    "Fine tips turn the nucleus and lens smoothly inside the capsular bag.",
  ],
  rulers: [
    "Find Helveston scleral rulers, Thornton corneal press-on rulers, K-wire rulers and pin gauges and Maloney keratometers.",
    "Clear, accurate scales make measuring in the field quick and reliable.",
  ],
  scissors: [
    "Shop surgical scissors by type, including Mayo, Metzenbaum, iris, tenotomy, suture, bandage, dissecting and wire-cutting scissors.",
    "Precisely set blades give clean, controlled cuts, from fine tissue to sutures and dressings.",
  ],
  screwdrivers: [
    "Find screwdrivers, including Williams screwdrivers, screwdriver bits and screw holding sleeves.",
    "Secure tips seat and remove bone screws with good torque control.",
  ],
  seekers: [
    "Shop Kuhn frontal sinus seekers and frontal and maxillary ostium seekers.",
    "Slim, curved tips locate and probe sinus openings gently.",
  ],
  separators: [
    "Find Hoen, Frazier, Horsley, Sachs and Dorsey dural separators, Davis nerve separators and Smith ramus separators.",
    "Smooth, thin blades free dura and nerve roots from surrounding tissue gently.",
  ],
  "septum-needles": [
    "Shop septum needles for injecting and anesthetizing the nasal septum.",
    "Long, fine shafts reach the septum with good control and visibility.",
  ],
  serrefines: [
    "Find Dieffenbach, micro and D&K bulldog serrefines.",
    "Small, spring-loaded clamps occlude vessels and hold tissue with gentle pressure.",
  ],
  shears: [
    "Shop Sauerbruch, Gluck, Coryllos-Bethune, Stille, Giertz, Semb and Cooley rib shears.",
    "Heavy, compound-action blades cut rib and bone cleanly with less force.",
  ],
  snares: [
    "Find Tyding and Beck-Schenck tonsil snares, Krause ear and nasal snares, Bruening nasal snares and replacement wires.",
    "Fine wire loops tighten evenly to remove tissue cleanly.",
  ],
  spatulas: [
    "Shop Barraquer and Castroviejo cyclodialysis spatulas, Koch nucleus spatulas, Busin DSAEK glide spatulas and Davis brain spatulas.",
    "Smooth, malleable or vaulted blades separate and protect tissue in delicate planes.",
  ],
  speculum: [
    "Find Barraquer, Kratz-Barraquer, Lieberman and Lancaster lid specula, Auvard vaginal specula and Boucheron and Farrior ear specula.",
    "They hold tissue open steadily for clear, stable exposure.",
  ],
  speculums: [
    "Shop specula for the eye, ear, nose and vagina, in fixed, adjustable and self-retaining designs.",
    "They hold tissue open steadily for clear, stable exposure.",
  ],
  spoons: [
    "Find Peregrine DMEK donor tissue spoons, Bunge evisceration spoons, Wells enucleation spoons and Cushing and Hardy pituitary spoons.",
    "Smooth, cupped tips lift and carry tissue gently.",
  ],
  spreaders: [
    "Shop Inge and Cloward-style lamina spreaders, Finochietto rib spreaders, Lombardi femoral tibial spreaders and cast spreaders.",
    "Strong, steady jaws open and hold bone and wounds apart.",
  ],
  spuds: [
    "Find Golf club, Ellis, Davis, Francis, Dix and Walter foreign body spuds and Dix replacement tips.",
    "Fine tips lift foreign bodies from the cornea with minimal trauma.",
  ],
  "steinmann-pins": [
    "Shop Steinmann pins in double trocar, single trocar and double diamond point styles, in a range of diameters and lengths.",
    "They provide skeletal traction and fracture fixation.",
  ],
  stents: [
    "Shop stents, including vaginal stents, that hold tissue open and in shape while it heals.",
    "Smooth forms help keep the surgical result in place.",
  ],
  strippers: [
    "Find Bunnell, Brand and Fischer tendon strippers, Obwegeser J-strippers and Matson-Alexander rib strippers.",
    "They harvest tendon and strip periosteum cleanly along its length.",
  ],
  "suction-irrigators": [
    "Shop House suction irrigators and suction/irrigation tubes.",
    "They clear and irrigate the field at once, keeping a clear view in the ear and sinuses.",
  ],
  "suction-tubes": [
    "Find Frazier, Ferguson-Frazier, Andrews, Andrews-Pynchon, Anthony and Baron suction tubes.",
    "Smooth, balanced tubes clear blood and fluid for a clean field.",
  ],
  trays: [
    "Shop sterilization trays and cases, including diamond knife trays, microsurgical plastic and aluminum trays and retractor cases.",
    "They protect, organize and transport instruments through cleaning, sterilization and the OR.",
  ],
  trephines: [
    "Find Elliot and Best corneal trephines, Camellin LASEK trephines, Michele trephines and Searcy chalazion trephines.",
    "Sharp, round blades cut clean, even circular incisions.",
  ],
  trocars: [
    "Shop Coakley antrum trocars, Ochsner gallbladder trocars, Hurwitz thoracic trocars and sinus trocars with cannulas.",
    "Sharp points and fitted cannulas create access for drainage and irrigation.",
  ],
  tubing: [
    "Shop replacement silicone tubing for irrigation, aspiration and suction instruments.",
    "Flexible tubing keeps connections secure and flow consistent.",
  ],
  "wire-cutters": [
    "Shop wire cutters for K-wires, cerclage wire and pins.",
    "Hardened jaws and compound leverage cut cleanly with less hand effort.",
  ],
  "wire-twisters": [
    "Find Berry, Rubio, Corwin and Carroll wire twisters, sternal wire twisters and wire tighteners.",
    "Strong jaws grip and twist wire tight for secure closures.",
  ],
};

/** How a type reads mid-sentence on the specialty pages, where lower-casing the name is not enough. */
const nouns = {
  "electrodes-and-coagulators": "electrodes and coagulators",
  gags: "mouth gags",
  "hand-fixation": "hand fixation devices",
  "k-wires": "K-wires",
  miscellaneous: "specialty instruments",
  speculum: "specula",
  speculums: "specula",
  "steinmann-pins": "Steinmann pins",
};

/** "… for <phrase> at Ambler Surgical" on the specialty type pages. */
const specialtyPhrases = {
  ophthalmology: "ophthalmic surgery",
  "plastic-surgery": "plastic and reconstructive surgery",
  ent: "ear, nose and throat surgery",
  "hand-surgery": "hand surgery",
  orthopedic: "orthopedic surgery",
  "ob-gyn": "obstetric and gynecologic procedures",
  cardiovascular: "cardiac and vascular surgery",
  "neuro-spinal": "neurosurgery and spine surgery",
  "general-surgery": "general surgery",
};

/** Specialty pages (the one-line catalog description stays on the Browse by Specialty cards). */
const specialties = {
  // Figma's line first (34777:58994), then the old site's promise.
  ophthalmology:
    "Discover your virtual one-stop shop for premium ophthalmic surgical instruments. German and U.S. made, with Free Lifetime Repair on most Ambler brand instruments and a cross-reference for any catalog number.",
  "plastic-surgery":
    "The highest quality German made plastic surgery instruments at competitive prices, from forceps, hooks and needle holders to osteotomes. Enter any company's catalog number to see the exact Ambler Surgical equivalent.",
  ent: "Instruments for ear, nose and throat surgery such as tonsillectomy, adenoidectomy, tracheotomy and tympanoplasty. Find forceps, scissors, specula and knives alongside dedicated ear, sinus, nasal and throat instruments.",
  "hand-surgery":
    "The highest quality German made hand surgery instruments at competitive prices, including clamps, retractors, scissors and needle holders. Cross-reference any catalog number to find the exact Ambler Surgical equivalent.",
  orthopedic:
    "Orthopedic instruments for bone and joint procedures, from mallets, chisels and osteotomes to awls and drill bits. Our German made stainless steel and titanium needle holders come with or without tungsten carbide jaws.",
  "ob-gyn":
    "OB/GYN instruments for obstetric and gynecologic procedures, from exposing and sampling to dilating, holding and cutting. Shop speculums, obstetrical forceps, curettes, dilators and scissors by type.",
  cardiovascular:
    "Hand instruments for cardiac, cardiothoracic and vascular surgery, including Cooley, DeBakey and Satinsky clamps, Rochester-Ochsner forceps and Cooley sternal retractors, plus scissors and needle holders.",
  "neuro-spinal":
    "Neurosurgery and spine surgery instruments that cut, grasp and retract bone and soft tissue around the brain and spine, from Kerrison and Leksell rongeurs, Adson and Cushing forceps and Cloward retractors to curettes.",
  "general-surgery":
    "General surgery instruments in German and U.S. titanium and stainless steel for abdominal procedures, from the esophagus and stomach to the bowel, liver, gallbladder and bile ducts. Shop forceps, scissors, clamps and retractors.",
};

/** Category pages, keyed "<specialty>/<category>" (Ophthalmology > Instruments keeps its Figma copy). */
const categories = {
  "ophthalmology/specialty":
    "The specialty ophthalmic products you use every day, from I/A handpieces and tips, iris retractors and bipolar pencils to Ocular® and Volk® lenses, the Algerbrush II® and eye shields. Many ship the same day.",
  "ophthalmology/diamond-knives":
    "Diamond knives for ophthalmic procedures, with ultra-thin, reduced-angle cutting edges for clean, minimally invasive incisions. We supply hospitals and surgery centers across the USA.",
  "ophthalmology/disposables":
    "Single-use ophthalmic products, including blades and cannulas, iris retractors, pre-loaded CTRs, trephine blades, eye spheres and conformers. Our safety knives help protect your staff from sharps injuries.",
  "plastic-surgery/instruments":
    "Plastic surgery instruments by type, from forceps, hooks and needle holders to scissors, retractors and osteotomes. Choose a type below, or cross-reference any catalog number to find the exact equivalent.",
  "ent/instruments":
    "ENT instruments by type for ear, nasal, sinus and throat surgery, from suction tubes, curettes and elevators to seekers, rasps, snares and specula. Choose a type below to see every pattern.",
  "hand-surgery/instruments":
    "Hand surgery instruments by type, from clamps, retractors and scissors to needle holders, rongeurs and K-wires. Choose a type below, or cross-reference any catalog number to find the exact equivalent.",
  "orthopedic/instruments":
    "Orthopedic instruments by type for bone and joint procedures, from mallets, chisels and osteotomes to drill bits, retractors and forceps. Choose a type below to see every pattern.",
  "ob-gyn/instruments":
    "OB/GYN instruments by type, from speculums and obstetrical forceps to curettes, dilators and scissors, so you can start from the tool you need.",
  "cardiovascular/instruments":
    "Cardiovascular instruments by type, from Cooley and DeBakey clamps and forceps to scissors, retractors, dilators and needle holders. Choose a type below to see every pattern.",
  "neuro-spinal/instruments":
    "Neurosurgery and spine instruments by type, from Kerrison and Leksell rongeurs and Cushing forceps to Cloward retractors, curettes and suction tubes. Choose a type below to see every pattern.",
  "general-surgery/instruments":
    "General surgery instruments by type, from forceps, scissors and clamps to retractors and needle holders, in German and U.S. titanium and stainless steel. Choose a type below to see every pattern.",
};

/** Product line pages (Duckworth & Kent keeps its Figma copy). */
const brands = {
  "ambler-surgical":
    "Ambler Surgical's own line of German and U.S. made instruments, from ophthalmic cannulas, capsule polishers and blades to ENT adenotomes. Most Ambler brand ophthalmic instruments come with Free Lifetime Repair.",
  "ocular-instruments":
    "Since 1966, Ocular® Instruments has made ophthalmic lenses of exceptional sharpness and clarity. As one of the world's largest suppliers of diagnostic, laser and surgical lenses, it advances eye care worldwide.",
  surgistar:
    "Surgistar has made single-use ophthalmic, ENT, surgical and dental cutting instruments in Vista, California, for over twenty years, with one of the widest ranges of microsurgical blades, knives, cannulas and trephines.",
  "volk-optical":
    "Volk Optical designs and makes premium ophthalmic lenses. Dr. David Volk developed the first aspheric indirect ophthalmoscopy lens, which led to the double aspheric 20D, 78D and 90D lenses that set the standard.",
  "aspen-surgical":
    "Aspen Surgical, part of Hill-Rom, is a leading worldwide manufacturer of surgical disposables with an emphasis on safety, backed by domestic manufacturing and EtO and gamma sterilization capabilities.",
  "ellman-international":
    "Ellman International needle and loop electrodes, RF handpieces, bipolar cords and ENT electrodes for Surgitron systems. Founded in 1955, Ellman is a world leader in radiofrequency technology.",
  epsilon:
    "Epsilon USA makes a wide range of high quality, precision ophthalmic instruments in state-of-the-art facilities, with a quality management system that runs from product design to after-sales support.",
  "mastel-precision":
    "Mastel has designed and made ophthalmic surgical instruments exclusively since 1981, specializing in ultra-thin, reduced-angle diamond knife edges for minimally invasive incisions.",
  geuder:
    "Made in Germany, Geuder AG has been one of the most innovative eye surgery manufacturers for 65 years. Surgeons in over 90 countries rely on more than 3,000 Geuder products, made under ISO 13485.",
  rumex:
    "For over 25 years, Rumex International has supplied surgeons worldwide with durable, ergonomic ophthalmic instruments, developed together with leading surgeons and made under strict quality control.",
  "oculo-plastik":
    "Since 1985, Oculo-Plastik has made devices for ophthalmology, plastic surgery, dermatology and ocularistry, including laser eye shields, Durette® external shields, LaserSecure® instruments and conformers.",
  "bovie-medical":
    "Bovie Medical cautery tips, handles, pencils and accessories for clean hemostasis and precise tissue work, from fine tip cautery and loop contouring to suction coagulation and ophthalmic burr debridement.",
  "branson-ultrasonic":
    "Bransonic ultrasonic cleaners use 40 kHz sound waves to lift soil from surgical instruments. Choose CPX and M Series baths from 1/2 to 5 1/2 gallons, heated versions and the compact B200, with trays and baskets.",
  "eye-shield-technology":
    "Eye Shield Technology protective eye shields, including clear, blue, grey tinted and orange polycarbonate shields, Fox aluminum shields and the Duo-shield, plus OptiSpear PVA sponges.",
  "fiegert-endotech":
    "Fiegert-Endotech HD sinus endoscopes and otoscopes for clear, detailed views in ENT examination and surgery. Order them alongside the ENT instruments you use with them.",
  gsource:
    "gSource surgical instruments cover nearly every specialty, from iris scissors, probes and ingrown tissue hooks to knife handles and pin wheels. Compare pricing and find the pattern you need in one place.",
  "gulden-ophthalmics":
    "Since 1938, Gulden Ophthalmics has been a leading maker of ophthalmic instruments and devices for learning institutions and professionals worldwide, designed in close communication with eye care professionals.",
  "hurricane-medical":
    "Hurricane Medical single-use ophthalmic products, including Atkinson peribulbar and retrobulbar anesthesia needles, sub-Tenon and Rycroft cannulas, anterior chamber maintainers and capsule polishers.",
  lacrivera:
    "Lacrivera, a division of Stephens Instruments, offers products for treating dry eye, led by the VeraPlug punctal occluder, plus VeraC7 collagen inserts and Vera90 synthetic extended inserts.",
  "medin-trays":
    "Medin Technologies has made custom and standard instrument trays, cases and sterilization containers for over 40 years. Medin is FDA registered and ISO 9001 and ISO 13485 certified.",
  "micro-scientific":
    "For more than 35 years, USA-based Micro-Scientific® has supplied products that prevent microbial transmission and cross-contamination, guided by experts in microbiology, infection control and chemistry.",
  "odyssey-medical":
    "Odyssey Medical is a world leader in punctal occlusion. The silicone Parasol plug gives reversible occlusion for chronic dry eye, and Extend absorbable implants provide occlusion for up to 6 months.",
  "padgett-miltex":
    "For more than 50 years, Integra Miltex has been a leading supplier of hand-held surgical instruments, working with fine German instrument makers through Miltex GmbH. Its products are certified to ISO 13485.",
  "peregrine-surgical":
    "Founded in 1991, Peregrine Surgical makes reusable and disposable products for anterior and posterior segment surgery, including Re-Sposable forceps and illuminated endo-laser probes.",
  "polarware-trays":
    "Polar Ware is a US manufacturer of sanitary and sterilization medical items, including instrument trays, surgical wares, laboratory products and patient care items.",
  "pst-trays":
    "PST plastic sterilization trays protect, organize and transport delicate sets through decontamination, sterilization and the OR, from diamond knife and phaco handpiece trays to scope trays and silicone bars.",
  sterimedix:
    "SteriMedix single-use ophthalmic instruments, including bimanual irrigation and aspiration handpieces, Charles flute and backflush handpieces, Helsinki hydrodissection cannulas and Atkinson retrobulbar needles.",
  "steripack-trays":
    "Avalign Steripack designs and makes surgical instrument cases and trays that meet or exceed sterilization equipment recommendations, using premium materials for safer, more reliable sterilization.",
  "the-alger-company":
    "The Alger Company has made the AlgerBrush II and the Alger Light in the USA since 1970. The AlgerBrush is used worldwide by ophthalmologists, ER physicians and licensed optometrists to remove corneal rust rings.",
  "the-lebanon-corp":
    "The Lebanon Corp makes the Honan balloon intraocular pressure reducer, with replacement headbands, bellows, tubing, relief valves, pressure gauges and bulbs to keep it in service.",
};

/** Index pages. */
const pages = {
  browseBySpecialty:
    "For more than two decades, Ambler Surgical has supplied surgery centers and hospitals across the country with specialty surgical instruments at affordable prices, every one hand selected in titanium and stainless steel.",
  browseByType:
    "Find surgical instruments by what they do, from knives, forceps and scissors to retractors, rongeurs and suction tubes. Start from a popular type, jump to a letter, or cross-reference any catalog number.",
  // Figma's line first (34887:118658).
  forceps: `Grasping, clamping and tissue-manipulation instruments across every specialty. ${types.forceps[0]}`,
  contact:
    "Questions about an instrument, a cross-reference, an order or a repair? Call, email or send us a message and an Ambler Surgical instrument specialist will help you find exactly what you need.",
  sterilization:
    "From bowls and basins to sterilization trays and ultrasonic cleaners, Ambler Surgical is the smarter source for sterilization and cleaning products. Cross-reference any catalog number or browse by category.",
};

/** Hero copy for a type, on Browse by Type or (with a specialty) under a specialty. */
function typeIntro(type, specialty) {
  const [lead, use] = types[type.slug] || [];
  if (!specialty) return lead ? `${lead} ${use}` : null;
  const noun = nouns[type.slug] || type.name.toLowerCase();
  return `Shop high-quality ${noun} for ${specialtyPhrases[specialty.slug]} at Ambler Surgical.${use ? ` ${use}` : ""}`;
}

export default { types, nouns, specialtyPhrases, specialties, categories, brands, pages, typeIntro };
