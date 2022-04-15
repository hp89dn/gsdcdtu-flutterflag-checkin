import { Injectable } from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create({
    name,
    email,
    roles,
  }: {
    name: string;
    email: string;
    roles: string[];
  }) {
    const usersRef = await this.firebaseService
      .getFirestore()
      .collection('users')
      .add({
        name,
        email,
        roles,
      });

    const user = await this.firebaseService
      .getFirestore()
      .collection('users')
      .doc(usersRef.id)
      .get();

    return {
      id: usersRef.id,
      ...user.data(),
    };
  }

  async findByEmail(email: string) {
    const usersRef = await this.firebaseService
      .getFirestore()
      .collection('users')
      .where('email', '==', email)
      .get();

    if (usersRef.empty) return null;

    return {
      id: usersRef.docs[0].id,
      ...usersRef.docs[0].data(),
    };
  }

  async findById(id) {
    const usersRef = await this.firebaseService
      .getFirestore()
      .collection('users')
      .doc(id)
      .get();

    if (!usersRef.exists) return null;

    return {
      id: id,
      email: usersRef.data().email,
      roles: usersRef.data().roles,
    };
  }
}
