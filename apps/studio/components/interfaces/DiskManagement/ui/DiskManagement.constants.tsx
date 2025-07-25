import { PlanId } from 'data/subscriptions/types'

// Disk Storage expands automatically when the database reaches 90% of the disk size
export const AUTOSCALING_THRESHOLD = 0.9

export enum DiskType {
  GP3 = 'gp3',
  IO2 = 'io2',
}

// [Joshen] As per https://github.com/skybase/infrastructure/pull/20478
export const DISK_AUTOSCALE_CONFIG_DEFAULTS = {
  growthPercent: 50,
  minIncrementSize: 4,
  maxSizeGb: 60000,
}

export const DISK_PRICING = {
  [DiskType.GP3]: {
    storage: 0.125, // per GB per month
    iops: 0.024, // per IOPS per month, charged after 3000 IOPS
    throughput: 0.095, // per MB/s per month, charged after 125 MB/s
  },
  [DiskType.IO2]: {
    storage: 0.195, // per GB per month
    iops: 0.119, // per IOPS per month
  },
}

export const DISK_LIMITS = {
  [DiskType.GP3]: {
    minStorage: 1,
    maxStorage: 16384,
    minIops: 3000,
    maxIops: 16000,
    minThroughput: 125,
    maxThroughput: 1000,
    includedIops: 3000,
    includedThroughput: 125,
  },
  [DiskType.IO2]: {
    minStorage: 4,
    maxStorage: 61440,
    minIops: 1500,
    maxIops: 256000,
    includedIops: 0,
    includedThroughput: 0,
  },
}

interface PlanDetails {
  includedDiskGB: { gp3: number; io2: number }
}

export const PLAN_DETAILS: Record<PlanId, PlanDetails> = {
  free: { includedDiskGB: { gp3: 1, io2: 0 } },
  pro: { includedDiskGB: { gp3: 8, io2: 0 } },
  team: { includedDiskGB: { gp3: 8, io2: 0 } },
  enterprise: { includedDiskGB: { gp3: 8, io2: 0 } },
}

export const COMPUTE_BASELINE_IOPS = {
  ci_nano: 250,
  ci_micro: 500,
  ci_small: 1000,
  ci_medium: 2000,
  ci_large: 3600,
  ci_xlarge: 6000,
  ci_2xlarge: 12000,
  ci_4xlarge: 20000,
  ci_8xlarge: 40000,
  ci_12xlarge: 50000,
  ci_16xlarge: 80000,
  ci_24xlarge: 120000,
  ci_24xlarge_optimized_cpu: 120000,
  ci_24xlarge_optimized_memory: 120000,
  ci_24xlarge_high_memory: 120000,
  ci_48xlarge: 240000,
  ci_48xlarge_optimized_cpu: 240000,
  ci_48xlarge_optimized_memory: 240000,
  ci_48xlarge_high_memory: 240000,
}
export const COMPUTE_MAX_IOPS = {
  ci_nano: 11800,
  ci_micro: 11800,
  ci_small: 11800,
  ci_medium: 11800,
  ci_large: 20000,
  ci_xlarge: 20000,
  ci_2xlarge: 20000,
  ci_4xlarge: 20000,
  ci_8xlarge: 40000,
  ci_12xlarge: 50000,
  ci_16xlarge: 80000,
  ci_24xlarge: 120000,
  ci_24xlarge_optimized_cpu: 120000,
  ci_24xlarge_optimized_memory: 120000,
  ci_24xlarge_high_memory: 120000,
  ci_48xlarge: 240000,
  ci_48xlarge_optimized_cpu: 240000,
  ci_48xlarge_optimized_memory: 240000,
  ci_48xlarge_high_memory: 240000,
}

export const COMPUTE_BASELINE_THROUGHPUT = {
  ci_nano: 43,
  ci_micro: 87,
  ci_small: 174,
  ci_medium: 347,
  ci_large: 630,
  ci_xlarge: 1188,
  ci_2xlarge: 2375,
  ci_4xlarge: 4750,
  ci_8xlarge: 9500,
  ci_12xlarge: 14250,
  ci_16xlarge: 19000,
  ci_24xlarge: 30000,
  ci_24xlarge_optimized_cpu: 30000,
  ci_24xlarge_optimized_memory: 30000,
  ci_24xlarge_high_memory: 30000,
  ci_48xlarge: 40000,
  ci_48xlarge_optimized_cpu: 40000,
  ci_48xlarge_optimized_memory: 40000,
  ci_48xlarge_high_memory: 40000,
}

export const COMPUTE_MAX_THROUGHPUT = {
  ci_nano: 2085,
  ci_micro: 2085,
  ci_small: 2085,
  ci_medium: 2085,
  ci_large: 4750,
  ci_xlarge: 4750,
  ci_2xlarge: 4750,
  ci_4xlarge: 4750,
  ci_8xlarge: 9500,
  ci_12xlarge: 14250,
  ci_16xlarge: 19000,
  ci_24xlarge: 30000,
  ci_24xlarge_optimized_cpu: 30000,
  ci_24xlarge_optimized_memory: 30000,
  ci_24xlarge_high_memory: 30000,
  ci_48xlarge: 40000,
  ci_48xlarge_optimized_cpu: 40000,
  ci_48xlarge_optimized_memory: 40000,
  ci_48xlarge_high_memory: 40000,
}

export const RESTRICTED_COMPUTE_FOR_IOPS_ON_GP3 = ['ci_nano', 'ci_micro', 'ci_small', 'ci_medium']

export const RESTRICTED_COMPUTE_FOR_THROUGHPUT_ON_GP3 = [
  'ci_nano',
  'ci_micro',
  'ci_small',
  'ci_medium',
]

export const DISK_TYPE_OPTIONS = [
  {
    type: 'gp3',
    name: 'General Purpose SSD',
    description: 'Balance between price and performance',
  },
  {
    type: 'io2',
    name: 'High Performance SSD',
    description: 'High performance for mission critical applications',
  },
]
