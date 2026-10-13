import type { Project } from './projects';

const repo = 'https://github.com/Adyan05/dWill-A-Blockchain-Based-Dead-Man-s-Switch-Storage-System';
const report = `${repo}/blob/main/Final-Grp-O.pdf`;
const asset = (name: string) => `images/dwill/${name}.jpg`;

export const dwill: Project = {
  id: 'dwill', title: 'dWill',
  fullTitle: 'dWill — A Blockchain-Based Dead Man’s Switch Storage System',
  subtitle: 'Blockchain-Based Digital Inheritance System',
  category: 'Software Engineering', accent: 'dwill',
  description: 'A decentralised digital inheritance prototype combining smart contracts, encrypted IPFS storage, and a Dead Man’s Switch for conditional access to digital assets.',
  cover: asset('poster'), repository: repo,
  institution: 'University of Nottingham Malaysia',
  module: 'COMP2019 / G52GRP · Group O · Four-member team',
  achievement: 'First Place Award — Best Industry Project, 2024',
  technologies: ['React', 'TypeScript', 'Vite', 'Solidity', 'IPFS', 'Pinata', 'thirdweb', 'Web3'],
  documentation: report,
  slides: [
    { id: 'poster', kind: 'overview', title: 'Your will, at your fingertips.',
      body: 'Rethinking digital inheritance through blockchain and decentralised storage. A university software engineering project exploring encrypted files, smart contracts, and inactivity-based access workflows.',
      image: asset('poster'), imageAlt: 'Original Group O dWill project poster showing the workflow, encryption approach, and architecture.',
      caption: 'Original project poster · Group O · University of Nottingham Malaysia',
      links: [{label: 'Open full-size poster', url: asset('poster')}] },
    { id: 'overview', kind: 'overview', title: 'A structured path for digital inheritance.',
      body: 'Developed for the Software Engineering Group Project, dWill lets benefactors store digital assets and nominate beneficiaries. The academic prototype connects a React interface, Solidity contracts, and IPFS storage to explore conditional access.',
      image: asset('landing'), imageAlt: 'dWill landing page captured in the final report.', caption: 'Final report · Figure 10 · Original implementation screenshot' },
    { id: 'problem', kind: 'problem', title: 'What happens to digital assets after inactivity?',
      body: 'Access to digital files can be difficult to transfer when their owner is unavailable. Sharing account credentials creates its own risks, while provider-dependent arrangements can limit control. dWill investigates a structured benefactor–beneficiary workflow.',
      bullets: ['Define who may receive each asset.', 'Keep file storage separate from blockchain records.', 'Provide a response window before the retrieval process can proceed.'],
      cards: [{title:'The design question',text:'How can a file owner arrange conditional access without simply handing over an account?'}] },
    { id: 'solution', kind: 'architecture', title: 'A seven-day opportunity to respond.',
      body: 'An assigned beneficiary activates the switch. The contract defines a seven-day countdown; a timely benefactor response cancels it. After expiry, contract interactions update the state and the beneficiary can proceed through retrieval. This is an inactivity trigger, not proof of death or an automatic legal inheritance process.',
      workflow: ['Benefactor setup → wallet connection', 'Encrypt files and upload to IPFS', 'Assign beneficiary and exchange public keys', 'Beneficiary activates the switch', 'Seven-day response window'],
      branches: ['Respond in time → switch cancelled', 'No timely response → retrieval process proceeds'],
      caption: 'Conceptual workflow summarised from the final report and DeadMansSwitch.sol. Actual setup includes beneficiary/key configuration before assigning encrypted file references.' },
    { id: 'implementation', kind: 'technologies', title: 'Four layers, one prototype.',
      body: 'The interface coordinates wallet transactions, file uploads, and encrypted references. Contracts store subscription and beneficiary state; Pinata handles IPFS uploads. Files are not stored directly on-chain.',
      cards: [
        {title:'Frontend',text:'React, TypeScript and Vite provide the interface and benefactor/beneficiary dashboards.'},
        {title:'Blockchain',text:'Solidity contracts manage subscriptions, switch state and stored file references. thirdweb integrates wallet interactions.'},
        {title:'Storage',text:'Pinata uploads files to IPFS; content identifiers connect stored files to application records.'},
        {title:'Cryptography',text:'The source implements AES-128-CTR file encryption and a Diffie–Hellman-based shared-secret approach for encrypted references. This is a learning implementation, not audited security.'}
      ], caption: 'The report records Polygon Amoy testing; the checked-in provider names “polygon”. The current deployed network is not independently verified.' },
    { id: 'architecture', kind: 'architecture', title: 'How the components fit together.',
      body: 'The original architecture diagram connects the browser and frontend to thirdweb, wallet authentication, IPFS storage and three smart contracts. It is preserved as project documentation rather than a claim about a currently running service.',
      image: asset('architecture'), imageAlt: 'Original dWill architecture diagram linking React, providers, IPFS and the Dead Man’s Switch, subscription and upload contracts.', caption: 'Final report · Figure 4 · Original architecture diagram',
      links: [{label:'Open architecture diagram',url:asset('architecture')}] },
    { id: 'features', kind: 'features', title: 'The core experience.',
      cards: [
        {title:'Benefactor & beneficiary management',text:'Configure the two roles and assign beneficiaries to a benefactor.'},
        {title:'Encrypted digital asset storage',text:'Encrypt supported files and upload them through Pinata to IPFS.'},
        {title:'Seven-day Dead Man’s Switch',text:'Activate a countdown and let the benefactor respond before expiry.'},
        {title:'Smart contract integration',text:'Read and update subscription, switch and file-reference state.'},
        {title:'Web3 wallet connectivity',text:'Connect a wallet through thirdweb for blockchain interactions.'},
        {title:'Subscription & asset management',text:'Manage subscriptions, assigned file references and retrieval workflows.'}
      ] },
    { id: 'contributions', kind: 'objectives', title: 'My contributions.',
      body: 'Technical Research Lead and Tester within a four-member team. I collaborated on the design, implementation, integration, testing and documentation of the academic prototype.',
      cards: [
        {title:'Notification research',text:'Proposed Tenderly’s alert system for configurable event-driven prompts and notifications.'},
        {title:'IPFS retrieval',text:'Contributed code for retrieving files from IPFS and downloading them.'},
        {title:'System testing',text:'Performed system testing after the final prototype was assembled.'}
      ], caption: 'Attribution: final report §7.1.1, PDF page 20. Repository author metadata did not independently establish individual ownership of these changes.',
      links:[{label:'Read contribution record',url:report+'#page=20'}] },
    { id: 'results', kind: 'results', title: 'First Place — Best Industry Project.',
      body: 'Group O received the 2024 First Place Award for Best Industry Project in the Software Engineering Group Project module. The team delivered an academic prototype integrating wallet connectivity, file handling, beneficiary management and switch workflows.',
      image: asset('award'), imageAlt: 'University of Nottingham Malaysia certificate awarding Group O First Place, Best Industry Project, 2024.',
      caption: 'Award wording verified against the supplied group certificate. No production usage, performance or security-audit claims are made.',
      links:[{label:'View award certificate',url:asset('award')}] },
    { id: 'learnings', kind: 'objectives', title: 'What the project taught us.',
      body: 'The project brought together unfamiliar technologies and highlighted the gap between demonstrating a workflow and making it production-ready.',
      bullets: ['Integrating frontend state with asynchronous contract interactions.', 'Managing IPFS references and file retrieval across components.', 'Designing conditional access and response workflows.', 'Coordinating cryptographic operations and key handling.', 'Combining research, development and testing within a four-member team.'],
      cards:[{title:'Prototype limitations',text:'The key-exchange parameters are educational in scale and the file cipher uses a fixed IV. Production use would require a redesigned cryptographic scheme, access-control review and independent security assessment.'}] },
    { id: 'gallery', kind: 'screenshots', title: 'Inside the implementation.',
      body:'Original figures extracted from the final report. The poster and architecture are available in full size; presentation slides can be added later.',
      gallery: [
        {title:'Landing page',image:asset('landing'),caption:'Final report, Figure 10.'},
        {title:'Wallet / subscription connection',image:asset('wallet'),caption:'Final report, Figure 12: subscription confirmation.'},
        {title:'File upload',image:asset('upload'),caption:'Final report, Figure 15: upload and file assignment.'},
        {title:'Beneficiary management',image:asset('benefactors'),caption:'Final report, Figure 13: benefactor dashboard.'},
        {title:'Dead Man’s Switch',image:asset('switch'),caption:'Final report, Figure 17: beneficiary dashboard.'},
        {title:'System architecture',image:asset('architecture'),caption:'Final report, Figure 4.'},
        {title:'Project poster',image:asset('poster'),caption:'Original Group O poster.'},
        {title:'Presentation slides',caption:'Placeholder — original presentation slides have not been supplied.'}
      ] },
    { id: 'resources', kind: 'repository', title: 'Explore the project materials.',
      body:'Read the original academic documentation and source. These resources describe the project as delivered; they are not a live application.',
      links:[{label:'Final project report',url:report},{label:'Interim project report',url:`${repo}/blob/main/Interim-Grp-O.pdf`},{label:'Project poster (PDF)',url:`${repo}/blob/main/Poster-Grp-O.pdf`},{label:'Full-size poster image',url:asset('poster')}]
    }
  ]
};
