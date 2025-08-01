// services/admin/auditLog.js
class AuditLog {
    static async logAction(adminId, action, entityType, entityId) {
        await db.query(`
      INSERT INTO audit_log 
      (admin_id, action, entity_type, entity_id, timestamp)
      VALUES ($1, $2, $3, $4, NOW())
    `, [adminId, action, entityType, entityId]);
    }
}