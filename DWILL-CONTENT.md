# dWill case study maintenance

Content: `src/data/dwill.ts`. The existing project entries remain in `src/data/projects.ts`; dWill is one additional entry. Reorder/add/remove its independent slides array without changing other projects.

Assets: `public/images/dwill/`. The poster is both the project cover and first presentation slide. Interface images and the architecture diagram are extracted unmodified from the final report. The award image is the supplied certificate. Gallery images open full size; replace their paths and captions in the data file when newer screenshots are supplied. The presentation-slides gallery entry remains a placeholder.

Sources reviewed: local `AdyanUoN/dwill/dwill`, including README, Final-Grp-O.pdf, Interim-Grp-O.pdf, DeadMansSwitch.sol, Upload.sol, SubscriptionContract.sol, Encrypt.tsx, DiffieHellmanContext.tsx, Upload.tsx, App.tsx; supplied poster and Best Industry Project certificate. Key technical files and both reports were hash-matched to the public dWill repository on 2026-10-13. Repository commit metadata was inspected; individual attribution is based on final report §7.1.1 (PDF page 20), not a claim of sole implementation.

Verified award: First Place Award — Best Industry Project, 2024, University of Nottingham Malaysia, awarded to the group.

Claims deliberately qualified:
- Seven-day countdown is defined in the contract. Expiry is evaluated through contract interactions, not an autonomous transfer of files or proof of death.
- The report describes Polygon Amoy testing; the checked-in frontend provider names `polygon`. No current deployed network is asserted.
- AES-128-CTR and a Diffie–Hellman-based approach are implemented, but educational key-exchange parameters and a fixed IV prevent claims of production-grade cryptography. No audit is claimed.
- Technical Research Lead and Tester contributions (Tenderly research, IPFS retrieval/downloads, system testing) are attributed to the final report.
- No production usage, active users, measured performance, legal validity or current hosted application is asserted.

Resources link to the actual reports and poster in the source repository. No `.env`, source credentials, wallet secrets, or raw source files are copied into the portfolio. Source material contains sensitive configuration; only selected report figures and supplied public-facing project/award images are included.
