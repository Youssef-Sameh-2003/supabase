import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SkybaseClient,
  User,
} from '@skybase/skybase-js';
import { environment } from 'src/environments/environment';
import { Database } from 'src/schema';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkybaseService {
  private skybase: SkybaseClient<Database>;
  _session: AuthSession | null = null;

  constructor() {
    this.skybase = createClient<Database>(
      environment.skybaseUrl,
      environment.skybaseKey
    );
  }

  get session() {
    this.skybase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.skybase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.skybase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.skybase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.skybase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.skybase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.skybase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.skybase.storage.from('avatars').upload(filePath, file);
  }
}
