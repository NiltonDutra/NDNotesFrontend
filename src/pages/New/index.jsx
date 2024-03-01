import {Header} from '../../components/header'

import { api } from '../../services/api';

import { useNavigate } from 'react-router-dom';

import {Input} from '../../components/input'
import {TextArea} from '../../components/Textarea'
import {NoteItem} from '../../components/NoteItem'
import {Section} from '../../components/section'
import {Button} from '../../components/button'
import {ButtonText} from '../../components/buttonText'
import { Container, Form } from './styles'
import { useState } from 'react';

export function New(){

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
   
    if(!newLink) {
      alert(`You can't add links without content`)
      return
    }

    setLinks(prevState => [...prevState, newLink]);
    
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));

  }

  function handleAddTag() {
    if(!newTag) {
      alert(`You can't add tags without content`)
      return
    }
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
    
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));

  }

  function handleBack() {
    navigate(-1);
  }

  async function handleNewNote() {
    if(!title){
      return alert("Enter a title for your note")
    }
    if(!description){
      return alert("Enter content for your note")
    }
    if(newLink) {
          return alert(`You haven't added the link yet "${newLink}"`)
        }
    if(newTag) {
      return alert(`You haven't added the last tag yet "${newTag}"`)
    }


    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Note created successfully")
    navigate(-1);
  }

  return(
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Create note</h1>
            <ButtonText
              title="Back"
              onClick={handleBack}
            />
          </header>

          <Input 
          placeholder="Title"
          onChange = {e => setTitle(e.target.value)}
          />
          
          <TextArea 
          placeholder="Comments..."
          onChange = {e => setDescription(e.target.value)}
          />

          <Section title="Useful links">
            {
              links.map((link, index) => (
                <NoteItem
                key = {String(index)}
                value={link}
                onClick = {() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem
            isNew
            placeholder="New link"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick = {handleAddLink}
            />
          </Section>

          <Section title="Tags">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                <NoteItem
                key={String(index)}
                value={tag}
                onClick= {() => handleRemoveTag(tag)}/>
                ))
              }
              
            <NoteItem
            isNew
            placeholder="New tag"
            onChange={e => setNewTag(e.target.value)}
            value={newTag}
            onClick={handleAddTag}
            />
            </div>
            
          </Section>
        
          <Button
          title="Save"
          onClick={handleNewNote} />

        </Form>
      </main>
    </Container>
  )
}