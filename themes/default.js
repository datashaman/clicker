import costs from '~/mixins/costs'

const units = costs.data().units

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
    cost: 10000,
    icon: 'hand-pointer',
    reward: (state) => {
      state.factor *= 2
      state.buildings.cursor.cps *= 2
    },
    unlock: (state) => state.buildings.cursor.count >= 10,
  },
  cpu_1: {
    description: 'The CPUs are twice as efficient.',
    name: 'Silicon Board',
    cost: 1000,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 1,
  },
  cpu_2: {
    description: 'The CPUs are twice as efficient.',
    name: 'Heat Sink',
    cost: 5000,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 5,
  },
  cpu_3: {
    description: 'The CPUs are twice as efficient.',
    name: 'Thermal Glue',
    cost: 50000,
    icon: 'microchip',
    reward: (state) => {
      state.buildings.cpu.cps *= 2
    },
    unlock: (state) => state.buildings.cpu.count >= 25,
  },
  process_1: {
    description: 'The processes are twice as efficient.',
    name: 'RAM Upgrade',
    cost: 11000,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 1,
  },
  process_2: {
    description: 'The processes are twice as efficient.',
    name: 'Renice Priority -20',
    cost: 55000,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 5,
  },
  process_3: {
    description: 'The processes are twice as efficient.',
    name: '64-bit',
    cost: 550000,
    icon: 'project-diagram',
    reward: (state) => {
      state.buildings.process.cps *= 2
    },
    unlock: (state) => state.buildings.process.count >= 25,
  },
  service_1: {
    description: 'The services are twice as efficient.',
    name: 'REST API',
    cost: 120000,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 1,
  },
  service_2: {
    description: 'The services are twice as efficient.',
    name: 'Single Sign-On',
    cost: 600000,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 5,
  },
  service_3: {
    description: 'The services are twice as efficient.',
    name: 'Microservice Architecture',
    cost: 6000000,
    icon: 'cogs',
    reward: (state) => {
      state.buildings.service.cps *= 2
    },
    unlock: (state) => state.buildings.service.count >= 25,
  },
  computer_1: {
    description: 'The computers are twice as efficient.',
    name: 'External GPU',
    cost: 1300000,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 1,
  },
  computer_2: {
    description: 'The computers are twice as efficient.',
    name: 'Liquid Cooled',
    cost: 6500000,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 5,
  },
  computer_3: {
    description: 'The computers are twice as efficient.',
    name: 'Cray-1',
    cost: 65000000,
    icon: 'desktop',
    reward: (state) => {
      state.buildings.computer.cps *= 2
    },
    unlock: (state) => state.buildings.computer.count >= 25,
  },
  cluster_1: {
    description: 'The clusters are twice as efficient.',
    name: 'Distributed Directory',
    cost: 14000000,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 1,
  },
  cluster_2: {
    description: 'The clusters are twice as efficient.',
    name: 'Decentralized Auth',
    cost: 70000000,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 5,
  },
  cluster_3: {
    description: 'The clusters are twice as efficient.',
    name: 'Mining Rig',
    cost: 700000000,
    icon: 'network-wired',
    reward: (state) => {
      state.buildings.cluster.cps *= 2
    },
    unlock: (state) => state.buildings.cluster.count >= 25,
  },
  dataCenter_1: {
    description: 'The dataCenter are 2 times as efficient.',
    name: 'Multi Region',
    cost: 1500000000,
    icon: 'database',
    reward: (state) => {
      state.buildings.dataCenter.cps *= 2
    },
    unlock: (state) => state.buildings.dataCenter.count >= 25,
  },
}
