import Image from "next/image";
import styles from "./page.module.css";
import SignOut from "@/components/SingOut/SingOut";

const Profile = async () => {
  let profile;
  try {
    const data = await fetch("https://dummyjson.com/users/1");
    profile = await data.json();

    if (profile.message) {
      throw Error(profile.message);
    }
  } catch (error) {
    throw Error(error);
  }

  return (
    <div className={styles.container}>
      <Image
        src={profile.image}
        className={styles.image}
        alt="Profile Image"
        width={100}
        height={100}
      />
      <section className={styles.section}>
        <div className={styles.infoWrapper}>
          <p>სახელი: </p>
          <p>{profile.firstName}</p>
        </div>
        <div className={styles.infoWrapper}>
          <p>მაიდენნეიმი: </p>
          <p>{profile.maidenName}</p>
        </div>
        <div className={styles.infoWrapper}>
          <p>გვარი: </p>
          <p>{profile.lastName}</p>
        </div>
      </section>
    
      <SignOut className="wpd" />
    </div>
  );
};

export default Profile;
