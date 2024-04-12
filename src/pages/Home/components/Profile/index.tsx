import { ProfileCardContainer, Card, Link } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../lib/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faUserGroup,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faWebAwesome } from "@fortawesome/free-brands-svg-icons";

interface ProfileProps {
  avatarURL: string;
  description: string;
  htmlURL: string;
  followers: number;
  login: string;
  name: string;
}

export function ProfileCard() {
  const [profile, setProfile] = useState<ProfileProps>({
    avatarURL: "",
    description: "",
    htmlURL: "",
    followers: 1,
    login: "",
    name: "",
  });

  const fetchProfile = useCallback(async () => {
    const response = await api.get("/orgs/HOSTAQUI");

    const {
      avatar_url: avatarURL,
      description,
      html_url: htmlURL,
      followers,
      login,
      name,
    } = response.data;

    const filteredData = {
      avatarURL,
      description,
      htmlURL,
      followers,
      login,
      name,
    };

    setProfile(filteredData);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileCardContainer>
      <Card>
        <Link href={profile.htmlURL}>
          GITHUB
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Link>
        <header>
          <div className="userImage">
            <img src={profile.avatarURL} alt="Imagem de Avatar do Usuário" />
          </div>
          <div className="userInfos">
            <h1>{profile.name}</h1>
            <span>{profile.description}</span>
            <section className="userExtraInfos">
              <div>
                <FontAwesomeIcon icon={faGithub} />
                {profile.login}
              </div>
              <div>
                <FontAwesomeIcon icon={faWebAwesome} />
                Website
              </div>
              <div>
                <FontAwesomeIcon icon={faUserGroup} />
                {profile.followers} seguidores
              </div>
              <div>
                <FontAwesomeIcon icon={faPhone} />
                Suporte
              </div>
            </section>
          </div>
        </header>
      </Card>
    </ProfileCardContainer>
  );
}
