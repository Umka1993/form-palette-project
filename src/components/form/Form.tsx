import React, { useEffect, useState } from 'react';
import s from './form.module.scss';
import loadPhoto from '../../assets/photos/loadPhoto.png';
import { useDropzone } from 'react-dropzone';
import { api } from '../../api/baseRequest';

export const Form: React.FC = () => {
  const [image, setImage] = useState<File>();
  const [picture, setPicture] = useState<string | Blob>('');
  const [preview, setPreview] = useState<string | null>();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (image != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const { getRootProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },

    onDrop: (acceptedFiles) => {
      acceptedFiles.map((files) => getFile(files));
    }
  });

  const getFile = (file: File): void => {
    if (file) {
      setImage(file);
      setPicture(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data = new FormData();
    data.append('action', 'send_data');
    data.append('id', '1');
    data.set('contact[name]', name);
    data.set('contact[surname]', surname);
    data.set('contact[patronymic]', patronymic);
    data.append('image', picture);
    try {
      const res = await api.post('send.php', data);
      setResponse(res.data.status);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className={s.wrap}>
      <form onSubmit={async (data) => await onSubmit(data)}>
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id={'name'}
          name={'name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surName">Фамилия</label>
        <input
          type="text"
          id={'surName'}
          name={'surName'}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="patronymic">Отчество</label>
        <input
          type="text"
          id={'patronymic'}
          name={'patronymic'}
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
        />
        <label htmlFor="photo">
          Фото
          <div
            className={`${s.photoBlock} ${preview && s.photoBlockPreview}`}
            {...getRootProps()}
            style={
              preview != null
                ? {
                    backgroundImage: `url(${preview})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }
                : {}
            }>
            <img src={loadPhoto} alt="loadPhoto" />
          </div>
          <input
            type="file"
            id={'photo'}
            name={'photo'}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              const file: File = (target.files as FileList)[0];
              getFile(file);
            }}
          />
        </label>
        <button type={'submit'}>Сохранить</button>
        <label className={s.responseLabel}>Response</label>
        <input className={s.responseInput} readOnly={true} type="text" value={response} />
      </form>
    </div>
  );
};
