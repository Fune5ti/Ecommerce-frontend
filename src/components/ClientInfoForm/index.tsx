import { Button, Form, Input } from "antd";

interface Props {
  onFormFinish: (values: any) => void;
}
export default function ClientInfoForm({ onFormFinish }: Props) {
  const onFormLayoutChange = () => {};

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 22 },
  };
  const onFinish = (values: any) => {
    onFormFinish(values);
  };
  return (
    <Form
      {...layout}
      layout="vertical"
      initialValues={{}}
      onValuesChange={onFormLayoutChange}
      size="middle"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        label="Email"
        name="email"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contact"
        name="phone"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Zip" name="zip" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Country"
        name="country"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="CPF" name="cpf" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" size="large">
          Complete purchase
        </Button>
      </Form.Item>
    </Form>
  );
}
