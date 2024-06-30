import React, {useState} from 'react'
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

    const [trailerVideoPreviewUrl, setTrailerVideoPreviewUrl] = useState('');
    const [movieVideoPreviewUrl, setMovieVideoPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({frontend: 0, backend: 0});
    

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
        setIsLoading(true);
        setUploadProgress({frontend: 0, backend: 0});
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
            const response = await axios.post('https://api.streamflics.xyz/admin/addnewvideo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (ProgressEvent) => {
                    const percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
                    setUploadProgress(prev => ({...prev, frontend: percentCompleted}));
                },
                responseType: 'text',
            })
            const lines = response.data.split('\n');
            const lastLine = lines[lines.length - 2];
            const lastEvent = JSON.parse(lastLine.substring(5));

            if(lastEvent.message){
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

                setMovieVideoPreviewUrl('');
                setTrailerVideoPreviewUrl('');
                console.log(lastEvent.message);
                console.log(lastEvent.savedNewVideo);
                alert('Video added successfully')
            }else if(lastEvent.error){
                console.error(lastEvent.error);
            }
        }catch(error){
             console.log(error);
        }finally{
            setIsLoading(false);
        }
    }



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

                {isLoading && (
                    <>
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                        <div>
                            <p>Frontend to Backend: {uploadProgress.frontend.toFixed(2)} %</p>
                            <progress value={uploadProgress.frontend} max="100"/>
                            <p>Backend to s3/Cloudfront: {uploadProgress.backend.toFixed(2)} %</p>
                            <progress value={uploadProgress.backend} max="100"/>
                        </div>
                    </>
                    
                )}
            

                <button type='submit' disabled={isLoading}>Add Movie</button>
                
            </form>

        </div>
    </div>
  )
}

export default Addvideo