import React, {useEffect, useState} from 'react'
import './Addvideo.css';
import axios from 'axios'

function Addvideo() {


    const [form, setForm] = useState({
        title: '',
        releaseYear: '',
        quality: '',
        speciality: '',
        genres: [''],
        duration: '',
        description: '',
        certifications: [''],
        category: '',
        cast: [''],
        titleBanner: null,
        infoBanner: null,
        trailerVideo: null,
        movieVideo: null
    });

    const [uploadProgress, setUploadProgress] = useState({
        overall: 0,
        titleBanner: 0,
        infoBanner: 0,
        trailerVideo: 0,
        movieVideo: 0,
        database: 0
    });

    const [isUploading, setIsUploading] = useState(false)

    const [trailerVideoPreviewUrl, setTrailerVideoPreviewUrl] = useState('');
    const [movieVideoPreviewUrl, setMovieVideoPreviewUrl] = useState('');
    
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleVideoSelect = (file, type) => {
        const fileUrl = URL.createObjectURL(file);
        if(type === 'trailerVideo'){
            setForm({...form, trailerVideo: file});
            setTrailerVideoPreviewUrl(fileUrl);
        }else if(type === 'movieVideo'){
            setForm({...form, movieVideo: file});
            setMovieVideoPreviewUrl(fileUrl)
        }
    }


    const handleFileChange = (e) => {
        const {name, files} = e.target;
        setForm({
            ...form,
            [name]: files[0]
        });
        if(files && files[0]){
            let reader = new FileReader();
            reader.onload = (e) => {
                const imgPreview = document.getElementById(`${name}-preview`);
                if(imgPreview){
                    imgPreview.src = e.target.result;
                }else{
                    console.error(`Element with id ${name}-preview not found`);
                }
            }
            reader.readAsDataURL(files[0]);
        }
    }



    const handleArrayChange = (e, index, field) => {
        const {value} = e.target;
        const updatedArray = form[field].map((item, i) => (i === index ? value : item));
        setForm({
            ...form,
            [field]: updatedArray
        })
    }


    const addArrayField = (field) => {
        setForm({
            ...form,
            [field]: [...form[field], '']
        })
    }


    const removeArrayField = (index, field) => {
        const updatedArray = form[field].filter((_, i) => i !== index)
        setForm({
            ...form,
            [field]: updatedArray
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsUploading(true);
       
        try{
            const formData = new FormData();
            for(const key in form){
                if(key === 'trailerVideo' || key === 'moveiVideo'){
                    if(form[key]){
                        formData.append(key, form[key]);
                    }
                }else{
                    formData.append(key, Array.isArray(form[key]) ? JSON.stringify(form[key]) : form[key])
                }
            }
            const response = await axios.post('http://localhost:5000/admin/addnewvideo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (ProgressEvent) => {
                    const percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
                    setUploadProgress(prev => ({...prev, overall: percentCompleted}))
                  
                },
            });

            if(response.status === 200){
                setForm({
                    title: '',
                    releaseYear: '',
                    quality: '',
                    speciality: '',
                    genres: [''],
                    duration: '',
                    description: '',
                    certifications: [''],
                    category: '',
                    cast: [''],
                    titleBanner: null,
                    infoBanner: null,
                    trailerVideo: null,
                    movieVideo: null
                });

                console.log(response.data);
                setMovieVideoPreviewUrl('');
                setTrailerVideoPreviewUrl('');
                
                alert('Video added successfully')
            }
        }catch(error){
             console.log(error);
             setIsUploading(false);
        }
    }

    useEffect(() => {
        let eventSource;
        if(isUploading){
            eventSource = new EventSource('http://localhost:5000/admin/upload-progress');
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setUploadProgress(prev => ({...prev, ...data}));

                if(data.database === 100){
                    eventSource.close();
                    setIsUploading(false);
                    alert('Video added successfully');
                }
            };
            eventSource.onerror = (error) => {
                console.error('Event source failed: ', error);
                eventSource.close();
                setIsUploading(false)
            }
        }
        return () => {
            if(eventSource){
                eventSource.close();
            }
        }
    }, [isUploading])



  return (
    <div className='container'>
        <div className="left-container">
            <h2>ADD A NEW VIDEO</h2>
            <form action="" id='add-movie-form' onSubmit={handleSubmit}>

                <label htmlFor="category">Category</label>
                <input type="text" name='category' value={form.category} onChange={handleChange}/>

                <label htmlFor="title">Title of the Video</label>
                <input type="text" name='title' id='title' value={form.title} onChange={handleChange}/>

                <label htmlFor="title">Release Year</label>
                <input type="number" name='releaseYear' id='year' value={form.releaseYear} onChange={handleChange}/>

                <label htmlFor="title">Quality</label>
                <input type="text" name='quality' id='quality' value={form.quality} onChange={handleChange}/>

                <label htmlFor="title">Speciality</label>
                <input type="text" name='speciality' id='speciality' value={form.speciality} onChange={handleChange}/>

                <label htmlFor="genres">Genres</label>
                {form.genres.map((genre, index) => {
                        return(
                            <div key={index} className="dynamic-field">
                            <input type="text" value={genre} onChange={(e) => handleArrayChange(e, index, 'genres')}/>
                            <button type='button' onClick={() => removeArrayField(index, 'genres')}>Remove</button>
                            
                        </div>
                        )
                
                })}
                <button type='button' onClick={() => addArrayField('genres')}>Add Genre</button>

                <label htmlFor="title">Description</label>
                <textarea name="description" value={form.description} id="description" rows={4} onChange={handleChange}></textarea>

                <label htmlFor="title">Duration</label>
                <input type='text' name="duration" value={form.duration} id="duration" onChange={handleChange}/>

                <label htmlFor="certifications">Certifications</label>
                {form.certifications.map((certification, index) => {
                    
                    return(
                        <div className="dynamic-field">
                        <input type="text" value={certification} onChange={(e) => handleArrayChange(e, index, 'certifications')}/>
                        <button type='button' onClick={() => removeArrayField(index, 'certifications')}>Remove</button>
                    </div>
                    )
                    
                })}
                <button type='button' onClick={() => addArrayField('certifications')}>Add Certification</button>
            

                <label htmlFor="cast">Cast</label>
                {form.cast.map((actor, index) => {
                        return(
                            <div className="dynamic-field">
                                <input type="text" value={actor} onChange={(e) => handleArrayChange(e, index, 'cast')}/>
                                <button type='button' onClick={() => removeArrayField(index, 'cast')}>Remove</button>
                        
                            </div>
                        )
                })}
                <button type='button' onClick={() => addArrayField('cast')}>Add Cast</button>

                <label htmlFor="titleBanner">Title Banner Image</label>
                <input type="file" name='titleBanner' id='titleBanner' onChange={handleFileChange}/>
                <img id='titleBanner-preview' className='preview-image' src="" alt="preview" />

                <label htmlFor="infoBanner">Info Banner Image</label>
                <input type="file" name='infoBanner' id='infoBanner' onChange={handleFileChange}/>
                <img id='infoBanner-preview' className='preview-image' src="" alt="" />

                <label htmlFor="trailerVideo">Trailer Video</label>
                <input type="file" accept='video/*,.avi,.mov,.wmv,.flv,.mkv,.webm' name='trailerVideo' id='trailerVideo' onChange={(e) => handleVideoSelect(e.target.files[0], 'trailerVideo')} />
                {trailerVideoPreviewUrl && (
                    <video src={trailerVideoPreviewUrl} controls className='preview-video'></video>
                )}

                <label htmlFor="movieVideo">Movie Video</label>
                <input type="file" accept='video/*,.avi,.mov,.wmv,.flv,.mkv,.webm' name='movieVideo' onChange={(e) => handleVideoSelect(e.target.files[0], 'movieVideo')} />
                {movieVideoPreviewUrl && (
                    <video src={movieVideoPreviewUrl} controls className='preview-video'></video>
                )}

                

                <button type='submit' disabled={isUploading}>{isUploading ? 'Uploading...' : 'Add Movie'}</button>
                
            </form>

            {isUploading && (
                <div className="upload-progress">
                    <div className="spinner"></div>
                    <p>Overall progress: {uploadProgress.overall}%</p>
                    <p>Title Banner: {uploadProgress.titleBanner}%</p>
                    <p>Info Banner: {uploadProgress.infoBanner}%</p>
                    <p>Trailer Video: {uploadProgress.trailerVideo}%</p>
                    <p>Movie Video: {uploadProgress.movieVideo}%</p>
                    <p>Database Save: {uploadProgress.database}%</p>
                </div>
            )}

        </div>
    </div>
  )
}

export default Addvideo