import React from 'react';
import { Modal, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography, Button } from '../ui';
import { COLORS, SIZES } from '../../constants/theme';
import IconRegistry from '../icons/IconRegistry';

interface TermsAndConditionsModalProps {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  visible,
  onClose,
  onAccept,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Typography variant="h2" color={COLORS.text.primary}>
              Términos y Condiciones
            </Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconRegistry name="arrow-right" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                1. Introducción
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Bienvenido a PetCare, la aplicación de obra social/prepaga para mascotas. Al utilizar nuestra aplicación, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con estos términos, por favor no utilices nuestra aplicación.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                2. Servicios
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              PetCare ofrece planes de cobertura médica para mascotas que incluyen consultas veterinarias, vacunaciones, cirugías, medicamentos y otros servicios según el plan contratado. Los detalles específicos de cobertura varían según el plan elegido y están sujetos a las condiciones particulares de cada plan.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                3. Registro y Cuenta
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Para utilizar nuestros servicios, debes crear una cuenta proporcionando información precisa y completa. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta. Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                4. Registro de Mascotas
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Al registrar a tus mascotas, garantizas que la información proporcionada es precisa y completa. La verificación veterinaria es obligatoria para el alta definitiva de la mascota en el sistema. Cualquier información falsa puede resultar en la cancelación de la cobertura.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                5. Pagos y Facturación
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Los pagos se procesan a través de los métodos disponibles en la aplicación (MercadoPago o débito automático). Las tarifas se cobran según el plan elegido y la cantidad de mascotas registradas. La falta de pago puede resultar en la suspensión de los servicios.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                6. Reserva de Turnos
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              La aplicación permite la reserva de turnos médicos con veterinarios de nuestra red. La cancelación o reprogramación debe realizarse con al menos 24 horas de anticipación para evitar cargos adicionales. La no asistencia a un turno sin previo aviso puede resultar en restricciones para futuras reservas.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                7. Privacidad y Datos
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Recopilamos y procesamos datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar nuestra aplicación, consientes la recopilación y el uso de tus datos según lo establecido en dicha política.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                8. Limitación de Responsabilidad
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              PetCare no se responsabiliza por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar nuestros servicios. La responsabilidad máxima de PetCare no excederá el monto pagado por el usuario en los últimos 12 meses.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                9. Modificaciones
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la aplicación. El uso continuado de la aplicación después de dichas modificaciones constituye la aceptación de los nuevos términos.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              <Typography variant="h3" color={COLORS.text.primary}>
                10. Ley Aplicable
              </Typography>
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa relacionada con estos términos será sometida a la jurisdicción exclusiva de los tribunales de la Ciudad Autónoma de Buenos Aires.
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.primary} style={styles.paragraph}>
              Al hacer clic en "Aceptar", confirmas que has leído, entendido y aceptado estos términos y condiciones.
            </Typography>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <Button
              title="Aceptar"
              onPress={onAccept}
              variant="primary"
              fullWidth
              icon={<IconRegistry name="paw" size={20} color={COLORS.white} />}
              iconPosition="left"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  closeButton: {
    padding: SIZES.spacing.xs,
    transform: [{ rotate: '90deg' }],
  },
  modalContent: {
    padding: SIZES.spacing.lg,
    maxHeight: '70%',
  },
  paragraph: {
    marginBottom: SIZES.spacing.md,
  },
  modalFooter: {
    padding: SIZES.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
});

export default TermsAndConditionsModal;
