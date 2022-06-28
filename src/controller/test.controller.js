import Test from '../models/Test'

export const getTest = async (req, res) => {
  const testList = await Test.find()

  res.status(200).json(testList)
}

export const getTestById = (req, res) => {

}

export const createTest = async (req, res) => {
  const { name, price } = req.body

  const newTest = new Test({ name, price })

  const testSaved = await newTest.save()

  res.status(201).json(testSaved)
}

export const updateTest = (req, res) => {

}

export const deleteTest = (req, res) => {

}
