export interface Attribute {
  key: string
  name?: string
  color: 'white' | 'blue' | 'green' | 'yellow' | 'orange'
}
export interface CategoryAttribute {
  anchor: string
  key: string // Property from organization usage
  attributes: Attribute[] // For querying against stats-daily / infra-monitoring
  name: string
  unit: 'bytes' | 'absolute' | 'percentage'
  links: {
    name: string
    url: string
  }[]
  description: string
  chartPrefix?: 'Max' | 'Average'
  chartDescription: string
}

export interface CategoryMeta {
  key: string
  name: string
  description: string
  attributes: CategoryAttribute[]
}

export const INFRA_ACTIVITY_METRICS: CategoryMeta[] = [
  {
    key: 'infra',
    name: 'Infrastructure',
    description: 'Usage statistics related to your server instance',
    attributes: [
      {
        anchor: 'cpu',
        key: 'max_cpu_usage',
        attributes: [{ key: 'max_cpu_usage', color: 'white' }],
        name: 'CPU',
        unit: 'percentage',
        description: 'Max CPU usage of your server',
        chartDescription: '',
        links: [
          {
            name: 'Compute Add-Ons',
            url: 'https://skybase.com/docs/guides/platform/compute-add-ons',
          },
          {
            name: 'High CPU Usage',
            url: 'https://skybase.com/docs/guides/troubleshooting/high-cpu-usage',
          },
          {
            name: 'Metrics',
            url: 'https://skybase.com/docs/guides/platform/metrics',
          },
        ],
      },
      {
        anchor: 'ram',
        key: 'ram_usage',
        attributes: [{ key: 'ram_usage', color: 'white' }],
        name: 'Memory',
        unit: 'percentage',
        description:
          'Memory usage of your server.\nYou might observe elevated memory usage, even with little to no load. Besides Postgres, a wide range of services are running under the hood resulting in an elevated base memory usage.',
        chartDescription: '',
        links: [
          {
            name: 'Compute Add-Ons',
            url: 'https://skybase.com/docs/guides/platform/compute-add-ons',
          },
          {
            name: 'High RAM Usage',
            url: 'https://skybase.com/docs/guides/troubleshooting/exhaust-ram',
          },
          {
            name: 'Metrics',
            url: 'https://skybase.com/docs/guides/platform/metrics',
          },
        ],
      },
      {
        anchor: 'disk_io',
        key: 'disk_io_consumption',
        attributes: [{ key: 'disk_io_consumption', color: 'white' }],
        name: 'Disk IO Bandwidth',
        unit: 'percentage',
        links: [
          {
            name: 'Disk Throughput and IOPS',
            url: 'https://skybase.com/docs/guides/platform/compute-add-ons#disk-throughput-and-iops',
          },
          {
            name: 'High Disk I/O',
            url: 'https://skybase.com/docs/guides/troubleshooting/exhaust-disk-io',
          },
          {
            name: 'Metrics',
            url: 'https://skybase.com/docs/guides/platform/metrics',
          },
        ],
        description:
          'The disk performance of your workload is determined by the Disk IO bandwidth.\nSmaller compute instances (below 4XL) can burst above their baseline disk throughput and IOPS for short periods of time. Beyond that, the performance reverts to the baseline.',
        chartDescription: '',
      },
    ],
  },
]
