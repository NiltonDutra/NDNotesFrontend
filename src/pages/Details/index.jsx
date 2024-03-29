import { useState, useEffect } from 'react';

import {Container, Links, Content} from './styles';

import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Tag } from '../../components/tags';
import { ButtonText } from '../../components/buttonText';
import { api } from '../../services/api';

export function Details()  {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();


  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Are you sure you want to remove the note?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data)
    }
    fetchNote();
  })

  return(
    <Container>
      <Header/>
        { data &&
          <main>
            <Content>
            <ButtonText
            onClick={handleRemove}
            title="Delete note"/>

            <h1>{data.title}</h1>
            <p>{data.description}</p>
          {  
          data.links &&
            <Section title="Useful links">
              <Links>
                {
                  data.links.map(link => (
                  <li key={String(link.id)}>
                    <a href={link.url} target="_blank">
                      {link.url}
                    </a> 
                  </li>
                  ))
                }
              </Links>
            </Section>
          }

          {
            data.tags &&
          <Section title="Tags">
            {
              data.tags.map(tag => (
              <Tag 
              key = {String(tag.id)}
              title={tag.name}/>
              ))
            }
          </Section>
          }

            <Button
            onClick = {handleBack}
            title="Back"/>
            </Content>
          </main>
        }
    </Container>
    
  )
}