


// Function to fetch notifications for a user
async function fetchNotificationsForUser(userId) {
    try {
      const notificationsSnapshot = await db.collection('notifications')
                                            .where('toUserId', '==', userId)
                                            .orderBy('createdAt', 'desc')
                                            .get();
      const notifications = [];
      notificationsSnapshot.forEach(doc => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications: ', error);
      throw error;
    }
}
    
const getNotificationsForUser = async (req, res) => {
    const { userId } = req.params;
    
    try {
      const notifications = await fetchNotificationsForUser(userId);

      res.status(200).send({ success: true, notifications });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Failed to fetch notifications.', error: error.message });
    }
};

// Function to update the notification's 'seen' status
async function markNotificationAsSeen(notificationId) {
    try {
      const notificationRef = db.collection('notifications').doc(notificationId);
      await notificationRef.update({ seen: true });
      console.log('Notification marked as seen.');
    } catch (error) {
      console.error('Error marking notification as seen: ', error);
    }
}

const patchNotificationAsSeen = async (req, res) => {
    const { id } = req.params;
    
    try {
      await markNotificationAsSeen(id);
      res.status(200).send({ success: true, message: 'Notification marked as seen.' });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Failed to mark notification as seen.', error: error.message });
    }
};

module.exports = {
    getNotificationsForUser,
    patchNotificationAsSeen
};
  