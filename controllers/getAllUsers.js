import signupschema from "../models/signupschema.js";

export const getAllUsers = async (req, res) => {
    try {
      const currentUserId = req.userId; 
  
      const users = await signupschema.find({ _id: { $ne: currentUserId } })
        .select('_id name email followers following');
      console.log(users)
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const getme = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const user = await signupschema.findById(currentUserId)
      .select('_id name email followers following');

    console.log(user);

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



  