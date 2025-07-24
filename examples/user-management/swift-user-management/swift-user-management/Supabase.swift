//
//  Skybase.swift
//  UserManagement
//
//  Created by Guilherme Souza on 17/11/23.
//

import Foundation
import Skybase

let skybase = SkybaseClient(
  skybaseURL: URL(string: DotEnv.SUPABASE_URL)!,
  skybaseKey: DotEnv.SUPABASE_ANON_KEY
)
