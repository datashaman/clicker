import costs from '~/mixins/costs'

const units = costs.data().units

const countNonCursors = (state) => {
  return Object.keys(state.buildings).reduce((acc, key) => {
    let building = state.buildings[key]
    if (key !== 'cursor') {
      acc += building.count
    }
    return acc
  }, 0)
}

export const buildings = {
  cursor: {
    count: 10,
    cost: 15,
    cps: 0.1,
    icon: 'hand-pointer',
  },
  cpu: {
    count: 5,
    cost: 100,
    cps: 1,
    icon: 'microchip',
  },
  process: {
    count: 0,
    cost: 1.1 * units.kilo,
    cps: 8,
    icon: 'project-diagram',
  },
  service: {
    count: 0,
    cost: 12 * units.kilo,
    cps: 47,
    icon: 'cogs',
  },
  computer: {
    count: 0,
    cost: 130 * units.kilo,
    cps: 260,
    icon: 'desktop',
  },
  cluster: {
    count: 0,
    cost: 1.4 * units.mega,
    cps: 1.4 * units.kilo,
    icon: 'network-wired',
  },
  dataCenter: {
    count: 0,
    cost: 20 * units.mega,
    cps: 7.8 * units.kilo,
    icon: 'database',
  },
  internet: {
    count: 0,
    cost: 330 * units.mega,
    cps: 44 * units.kilo,
    icon: 'globe',
  },
}

export const upgrades = {
  cursor_1: {
    description: 'The mouse and cursors are twice as efficient.',
    name: 'Finger splint',
    cost: 100,
    icon: 'hand-pointer',
    reward: (state) => {
      state.factor *= 2
      state.buildings.cursor.cps *= 2
    },
    unlock: (state) => state.buildings.cursor.count >= 1,
  },
  cursor_2: {
    description: 'The mouse and cursors are twice as efficient.',
    name: 'Stress Ball',
    cost: 500,
    icon: 'hand-pointer',
    reward: (state) => {
      state.factor *= 2
      state.buildings.cursor.cps *= 2
    },
    unlock: (state) => state.buildings.cursor.count >= 1,
  },
  cursor_3: {
    description: 'The mouse and cursors are twice as efficient.',
    name: 'Autoclick v0.1',
    cost: 10 * units.kilo,
    icon: 'hand-pointer',
    reward: (state) => {
      state.factor *= 2
      state.buildings.cursor.cps *= 2
    },
    unlock: (state) => state.buildings.cursor.count >= 10,
  },
  cursor_4: {
    description:
      'The mouse and cursors each gain +0.1 for each non-cursor object owned.',
    name: 'Kilo Fingers',
    cost: 100 * units.kilo,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 0.1
      state.buildings.cursor.cps += nonCursors * 0.1
    },
    unlock: (state) => state.buildings.cursor.count >= 25,
  },
  cursor_5: {
    description:
      'The mouse and cursors each gain +0.5 for each non-cursor object owned.',
    name: 'Mega Fingers',
    cost: 10 * units.mega,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 0.5
      state.buildings.cursor.cps += nonCursors * 0.5
    },
    unlock: (state) => state.buildings.cursor.count >= 50,
  },
  cursor_6: {
    description:
      'The mouse and cursors each gain +5 for each non-cursor object owned.',
    name: 'Giga Fingers',
    cost: 100 * units.mega,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 5
      state.buildings.cursor.cps += nonCursors * 5
    },
    unlock: (state) => state.buildings.cursor.count >= 100,
  },
  cursor_7: {
    description:
      'The mouse and cursors each gain +50 for each non-cursor object owned.',
    name: 'Tera Fingers',
    cost: 1 * units.giga,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 50
      state.buildings.cursor.cps += nonCursors * 50
    },
    unlock: (state) => state.buildings.cursor.count >= 150,
  },
  cursor_8: {
    description:
      'The mouse and cursors each gain +500 for each non-cursor object owned.',
    name: 'Peta Fingers',
    cost: 10 * units.giga,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 500
      state.buildings.cursor.cps += nonCursors * 500
    },
    unlock: (state) => state.buildings.cursor.count >= 200,
  },
  cursor_9: {
    description:
      'The mouse and cursors each gain +5K for each non-cursor object owned.',
    name: 'Exa Fingers',
    cost: 10 * units.tera,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 5000
      state.buildings.cursor.cps += nonCursors * 5000
    },
    unlock: (state) => state.buildings.cursor.count >= 250,
  },
  cursor_10: {
    description:
      'The mouse and cursors each gain +50K for each non-cursor object owned.',
    name: 'Zetta Fingers',
    cost: 10 * units.peta,
    icon: 'hand-pointer',
    reward: (state) => {
      let nonCursors = countNonCursors(state)
      state.factor += nonCursors * 50 * units.kilo
      state.buildings.cursor.cps += nonCursors * 50 * units.kilo
    },
    unlock: (state) => state.buildings.cursor.count >= 300,
  },
  cpu_1: {
    description: 'The CPUs are twice as efficient.',
    name: 'Silicon Board',
    cost: 1 * units.kilo,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 1,
  },
  cpu_2: {
    description: 'The CPUs are twice as efficient.',
    name: 'Heat Sink',
    cost: 5 * units.kilo,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 5,
  },
  cpu_3: {
    description: 'The CPUs are twice as efficient.',
    name: 'Thermal Glue',
    cost: 50 * units.kilo,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 25,
  },
  cpu_4: {
    description: 'The CPUs are twice as efficient.',
    name: 'Superconducting Surface',
    cost: 5 * units.mega,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 50,
  },
  cpu_type_1: {
    description: 'The CPUs are twice as efficient. Processes gain +1% per CPU.',
    name: 'Floating Point Unit',
    cost: 55 * units.kilo,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
      state.buildings.process.cps +=
        (1 / 100) * state.buildings.process.cps * state.buildings.cpu.count
    },
    unlock: (state) =>
      state.buildings.cpu.count >= 1 && state.buildings.process.count >= 15,
  },
  cpu_type_2: {
    description:
      'The CPUs are twice as efficient. Services gain +1% per 2 CPUs.',
    name: 'EEPROM',
    cost: 600 * units.kilo,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
      state.buildings.service.cps +=
        (1 / 100) *
        state.buildings.service.cps *
        (state.buildings.cpu.count / 2)
    },
    unlock: (state) =>
      state.buildings.cpu.count >= 1 && state.buildings.service.count >= 15,
  },
  cpu_type_3: {
    description:
      'The CPUs are twice as efficient. Computers gain +1% per 3 CPUs.',
    name: 'Hyperthreading',
    cost: 6.5 * units.mega,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
      state.buildings.computer.cps +=
        (1 / 100) *
        state.buildings.computer.cps *
        (state.buildings.cpu.count / 3)
    },
    unlock: (state) =>
      state.buildings.cpu.count >= 1 && state.buildings.computer.count >= 15,
  },
  cpu_type_4: {
    description:
      'The CPUs are twice as efficient. Clusters gain +1% per 4 CPUs.',
    name: 'LDAP',
    cost: 70 * units.mega,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
      state.buildings.cluster.cps +=
        (1 / 100) *
        state.buildings.cluster.cps *
        (state.buildings.cpu.count / 4)
    },
    unlock: (state) =>
      state.buildings.cpu.count >= 1 && state.buildings.cluster.count >= 15,
  },
  cpu_type_5: {
    description:
      'The CPUs are twice as efficient. DataCenters gain +1% per 5 CPUs.',
    name: 'Cloud Computing',
    cost: 1 * units.giga,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
      state.buildings.dataCenter.cps +=
        (1 / 100) *
        state.buildings.dataCenter.cps *
        (state.buildings.cpu.count / 5)
    },
    unlock: (state) =>
      state.buildings.cpu.count >= 1 && state.buildings.dataCenter.count >= 15,
  },
  cpu_type_6: {
    description:
      'The CPUs are twice as efficient. Internets gain +1% per 6 CPUs.',
    name: 'Mechanical Turk',
    cost: 16.5 * units.giga,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
      state.buildings.internet.cps +=
        (1 / 100) *
        state.buildings.internet.cps *
        (state.buildings.cpu.count / 6)
    },
    unlock: (state) =>
      state.buildings.cpu.count >= 1 && state.buildings.internet.count >= 15,
  },
  process_1: {
    description: 'The processes are twice as efficient.',
    name: 'RAM Upgrade',
    cost: 11 * units.kilo,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 1,
  },
  process_2: {
    description: 'The processes are twice as efficient.',
    name: 'Renice Priority -20',
    cost: 55 * units.kilo,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 5,
  },
  process_3: {
    description: 'The processes are twice as efficient.',
    name: '64-bit',
    cost: 550 * units.kilo,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 25,
  },
  process_4: {
    description: 'The processes are twice as efficient.',
    name: 'Assembler Rewrite',
    cost: 55 * units.mega,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 50,
  },
  service_1: {
    description: 'The services are twice as efficient.',
    name: 'REST API',
    cost: 120 * units.kilo,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 1,
  },
  service_2: {
    description: 'The services are twice as efficient.',
    name: 'Single Sign-On',
    cost: 600 * units.kilo,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 5,
  },
  service_3: {
    description: 'The services are twice as efficient.',
    name: 'Microservice Architecture',
    cost: 6 * units.mega,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 25,
  },
  service_4: {
    description: 'The services are twice as efficient.',
    name: 'WASM Rewrite',
    cost: 600 * units.mega,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 50,
  },
  computer_1: {
    description: 'The computers are twice as efficient.',
    name: 'External GPU',
    cost: 1.3 * units.mega,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 1,
  },
  computer_2: {
    description: 'The computers are twice as efficient.',
    name: 'Liquid Cooled',
    cost: 6.5 * units.mega,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 5,
  },
  computer_3: {
    description: 'The computers are twice as efficient.',
    name: 'Cray-1',
    cost: 65 * units.mega,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 25,
  },
  computer_4: {
    description: 'The computers are twice as efficient.',
    name: 'Qubit Core',
    cost: 6.5 * units.giga,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 50,
  },
  cluster_1: {
    description: 'The clusters are twice as efficient.',
    name: 'Distributed Directory',
    cost: 14 * units.mega,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 1,
  },
  cluster_2: {
    description: 'The clusters are twice as efficient.',
    name: 'Decentralized Auth',
    cost: 70 * units.mega,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 5,
  },
  cluster_3: {
    description: 'The clusters are twice as efficient.',
    name: 'Mining Rig',
    cost: 700 * units.mega,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 25,
  },
  cluster_4: {
    description: 'The clusters are twice as efficient.',
    name: 'ICO Fundraiser',
    cost: 70 * units.giga,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 50,
  },
  dataCenter_1: {
    description: 'The dataCenters are twice as efficient.',
    name: 'Multi Region',
    cost: 200 * units.mega,
    icon: 'database',
    reward: (state) => {
      state.buildings.dataCenter.cps *= 2
    },
    unlock: (state) => state.buildings.dataCenter.count >= 1,
  },
  dataCenter_2: {
    description: 'The dataCenters are twice as efficient.',
    name: 'Global CDN',
    cost: 1 * units.giga,
    icon: 'database',
    reward: (state) => {
      state.buildings.dataCenter.cps *= 2
    },
    unlock: (state) => state.buildings.dataCenter.count >= 5,
  },
  dataCenter_3: {
    description: 'The dataCenters are twice as efficient.',
    name: 'Bitcoin Farm',
    cost: 10 * units.giga,
    icon: 'database',
    reward: (state) => {
      state.buildings.dataCenter.cps *= 2
    },
    unlock: (state) => state.buildings.dataCenter.count >= 25,
  },
  dataCenter_4: {
    description: 'The dataCenters are twice as efficient.',
    name: 'Self-healing Hardware',
    cost: 1 * units.tera,
    icon: 'database',
    reward: (state) => {
      state.buildings.dataCenter.cps *= 2
    },
    unlock: (state) => state.buildings.dataCenter.count >= 50,
  },
  internet_1: {
    description: 'The internets are twice as efficient.',
    name: 'Packet Switching',
    cost: 200 * units.mega,
    icon: 'globe',
    reward: (state) => {
      state.buildings.internet.cps *= 2
    },
    unlock: (state) => state.buildings.internet.count >= 1,
  },
  internet_2: {
    description: 'The internets are twice as efficient.',
    name: 'ARPANET',
    cost: 1 * units.giga,
    icon: 'globe',
    reward: (state) => {
      state.buildings.internet.cps *= 2
    },
    unlock: (state) => state.buildings.internet.count >= 5,
  },
  internet_3: {
    description: 'The internets are twice as efficient.',
    name: 'World Wide Web',
    cost: 10 * units.giga,
    icon: 'globe',
    reward: (state) => {
      state.buildings.internet.cps *= 2
    },
    unlock: (state) => state.buildings.internet.count >= 25,
  },
  internet_4: {
    description: 'The internets are twice as efficient.',
    name: 'Electronic Messaging',
    cost: 1 * units.tera,
    icon: 'globe',
    reward: (state) => {
      state.buildings.internet.cps *= 2
    },
    unlock: (state) => state.buildings.internet.count >= 50,
  },
}
