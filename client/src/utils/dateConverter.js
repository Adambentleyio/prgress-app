const dateConverter = (mongoDbDate) => {
    return new Date(mongoDbDate).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})
}

export default dateConverter