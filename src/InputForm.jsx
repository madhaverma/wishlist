
function InputForm(){
return (
 <div className="main-container">
    <h1 className="page-title">Add New Topic </h1>
    <p className="page-subtitle"> fill out the details below to create a new topic for your collection </p>
        <div className="form-card">
        <form action="post">
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Enter topic title" id="titlle" />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description </label>
            <input type="text" placeholder="Enter a brief description" id="description" />
        </div>
        <div className="form-group">
            <label htmlFor="url"> Topic URl</label>
            <input type="text" placeholder="🔗 https : // example.com" id="url"/>
        </div>
            <button type="submit" className="submit-btn"> + Add Topic </button>
             <p class="helper-text">This topic will be visible to your team immediately after creation.</p>
        </form>       
        </div>
        </div>
    )

}

export default InputForm; 